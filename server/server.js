// server.mjs - Renamed from server.js to enforce ESM
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  queueLimit: 0,
});

// Verify DB connection
pool.getConnection()
  .then(conn => {
    console.log('Database connected!');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });



// For __dirname equivalent in ES modules


const app = express();



// Middleware
app.use(express.json());
app.use(
  cors({
       origin: ["https://hc-churros.com"], // Add localhost for development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.use("/promos", express.static(path.join(__dirname, "public", "promos")));

app.use(cookieParser());



//__________________________________________________________________________________

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    db: pool.pool._freeConnections.length > 0 ? 'connected' : 'disconnected'
  });
});


// Admin login endpoint

const loginLimiter = rateLimit({
  windowMs: 50 * 60 * 1000,

  message: "Too many login attempts, please try again later",
  skipSuccessfulRequests: true,
});

app.post("/api/admin/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    // 1. Check if admin exists
    const [adminRows] = await pool.query(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );

    if (adminRows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const admin = adminRows[0];

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    // 4. Return success response (no cookies)
    return res.json({
      success: true,
      message: "Login successful",
      token,
      username: admin.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token payload" });
    }

    const [adminRows] = await pool.query(
      "SELECT username FROM admins WHERE id = ?",
      [decoded.id]
    );

    if (adminRows.length === 0) {
      return res.status(401).json({ success: false, error: "Admin not found" });
    }

    return res.json({
      success: true,
      username: adminRows[0].username,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};

app.get("/api/admin/verify-token", verifyToken);

//___________________________________________________________________________________

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "public", "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images only! (JPEG, JPG, PNG, GIF)"));
    }
  },
});

// API Endpoints
app.get("/api/stalls", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT stall_id, stall_name, address, google_maps_url, image_path 
      FROM stalls
      ORDER BY stall_name`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all churros stalls
app.get("/api/admin/data/stalls", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT stall_id, stall_name, address, google_maps_url, image_path 
      FROM stalls
      ORDER BY stall_name`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single stall
app.get("/api/admin/data/stalls/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT stall_id, stall_name, address, google_maps_url, image_path 
      FROM stalls 
      WHERE stall_id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add new stall
app.post("/api/admin/data/stalls", upload.single("image"), async (req, res) => {
  try {
    const { stall_name, address, google_maps_url } = req.body;

    // Validate required fields
    if (!stall_name || !address) {
      if (req.file) {
        fs.unlinkSync(
          path.join(__dirname, "public", "uploads", req.file.filename)
        );
      }
      return res
        .status(400)
        .json({ error: "Stall name and address are required" });
    }

    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO stalls (stall_name, address, google_maps_url, image_path)
       VALUES (?, ?, ?, ?)`,
      [stall_name, address, google_maps_url, image_path]
    );

    // Get the newly created stall
    const [rows] = await pool.query(`SELECT * FROM stalls WHERE stall_id = ?`, [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);

    // Delete uploaded file if error occurred
    if (req.file) {
      fs.unlinkSync(
        path.join(__dirname, "public", "uploads", req.file.filename)
      );
    }

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "Stall with this name already exists" });
    }

    res.status(500).json({
      error: "Failed to add stall",
      details: err.message,
    });
  }
});

// Update stall (with image handling)
app.put(
  "/api/admin/data/stalls/:id",
  upload.single("image"),
  async (req, res) => {
    const stallId = req.params.id;

    try {
      // 1. Get the existing stall first
      const [existingStall] = await pool.query(
        `SELECT * FROM stalls WHERE stall_id = ?`,
        [stallId]
      );

      if (existingStall.length === 0) {
        return res.status(404).json({ error: "Stall not found" });
      }

      // 2. Handle the image update
      let image_path = existingStall[0].image_path;

      if (req.file) {
        // Delete old image if it exists
        if (existingStall[0].image_path) {
          const oldImagePath = path.join(
            __dirname,
            "public",
            existingStall[0].image_path
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        // Set new image path
        image_path = `/uploads/${req.file.filename}`;
      }

      // 3. Update the stall
      const { stall_name, address, google_maps_url } = req.body;

      if (!stall_name || !address) {
        if (req.file) {
          fs.unlinkSync(
            path.join(__dirname, "public", "uploads", req.file.filename)
          );
        }
        return res
          .status(400)
          .json({ error: "Stall name and address are required" });
      }

      await pool.query(
        `UPDATE stalls 
       SET stall_name = ?, address = ?, google_maps_url = ?, image_path = ?
       WHERE stall_id = ?`,
        [stall_name, address, google_maps_url, image_path, stallId]
      );

      // 4. Get the updated stall
      const [rows] = await pool.query(
        `SELECT * FROM stalls WHERE stall_id = ?`,
        [stallId]
      );

      res.json(rows[0]);
    } catch (err) {
      console.error(err);

      // Delete uploaded file if error occurred
      if (req.file) {
        fs.unlinkSync(
          path.join(__dirname, "public", "uploads", req.file.filename)
        );
      }

      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(400)
          .json({ error: "Stall with this name already exists" });
      }

      res.status(500).json({
        error: "Failed to update stall",
        details: err.message,
      });
    }
  }
);

// Delete stall
app.delete("/api/admin/data/stalls/:id", async (req, res) => {
  const stallId = req.params.id;

  try {
    // 1. Get the stall first to delete its image
    const [stall] = await pool.query(
      `SELECT image_path FROM stalls WHERE stall_id = ?`,
      [stallId]
    );

    if (stall.length === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    // 2. Delete the image file if it exists
    if (stall[0].image_path) {
      const imagePath = path.join(__dirname, "public", stall[0].image_path);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 3. Delete the stall from database
    const [result] = await pool.query(`DELETE FROM stalls WHERE stall_id = ?`, [
      stallId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to delete stall",
      details: err.message,
    });
  }
});

// ________________________________________________________________________________________________
const promosStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "public", "promos");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.random(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "promo-" + uniqueSuffix + ext);
  },
});

const uploadPromos = multer({ storage: promosStorage });



app.post(
  "/api/admin/data/promos",
  uploadPromos.single("image"),
  async (req, res) => {
    try {
      const name = req.body.name;
      const filePath = `/promos/${req.file.filename}`;

      const [result] = await pool.query(
        "INSERT INTO promos (name, image_path) VALUES (? , ?)",
        [name, filePath]
      );

      res.json({
        success: true,
        message: "Promo uploaded successfully",
        data: { id: result.insertId, name, image_path: filePath },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ json: "Database insert failed" });
    }
  }
);

app.get("/api/admin/data/promos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM promos");
    res.json({ success: true, promos: rows || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, promos: [], error: err.message });
  }
});

// rou te to fetch
app.get("/api/admin/data/promos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM promos WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ sucess: false, error: "Promo not found" });
    }

    const promo = rows[0];

    res.json({ success: true, data: promo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ sucess: false, error: "Failed to fetch promo" });
  }
});

// Delete route for promo (updated)
app.delete("/api/admin/data/promos/:id", async (req, res) => {
  try {
    const [promo] = await pool.query("SELECT * FROM promos WHERE id = ?", [
      req.params.id,
    ]);

    if (!promo.length) {
      return res.status(404).json({ error: "Promo not found" });
    }

    // Extract just the filename from the stored path
    const filename = promo[0].image_path.replace("/public/promos/", "");
    const imagePath = path.join(__dirname, "public", "promos", filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.warn(`File not found at path: ${imagePath}`);
    }

    await pool.query("DELETE FROM promos WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ________________________________________________________________________________________________

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Server startup
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// ________________________________________________________________________________________________
