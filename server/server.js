import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// For __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174", 
  allowedHeaders: ['Content-Type', 'Authorization' , 'X-Debug-Request' ],
  exposedHeaders: ['set-cookie']
}));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(cookieParser());


// Database connection
export const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ,
  waitForConnections: true,
  queueLimit: 0,
});

//__________________________________________________________________________________

// /backend
//   ├── config/
//   │   ├── db.js
//   │   └── passport.js
//   ├── models/
//   │   └── User.js
//   ├── routes/
//   │   ├── auth.js
//   │   └── oauth.js
//   └── server.js

// Admin login endpoint





//___________________________________________________________________________________



// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, 'public', 'uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images only! (JPEG, JPG, PNG, GIF)'));
    }
  }
});

// API Endpoints

// Get all churros stalls
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

// Get single stall
app.get("/api/stalls/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT stall_id, stall_name, address, google_maps_url, image_path 
      FROM stalls 
      WHERE stall_id = ?`, [req.params.id]);
    
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
app.post("/api/stalls", upload.single('image'), async (req, res) => {

  
  try {
    const { stall_name, address, google_maps_url } = req.body;
    
    // Validate required fields
    if (!stall_name || !address) {
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
      }
      return res.status(400).json({ error: "Stall name and address are required" });
    }

    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO stalls (stall_name, address, google_maps_url, image_path)
       VALUES (?, ?, ?, ?)`,
      [stall_name, address, google_maps_url, image_path]
    );

    // Get the newly created stall
    const [rows] = await pool.query(
      `SELECT * FROM stalls WHERE stall_id = ?`, 
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    
    // Delete uploaded file if error occurred
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
    }

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Stall with this name already exists" });
    }

    res.status(500).json({ 
      error: "Failed to add stall",
      details: err.message 
    });
  }
});

// Update stall (with image handling)
app.put("/api/stalls/:id", upload.single('image'), async (req, res) => {
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
        const oldImagePath = path.join(__dirname, 'public', existingStall[0].image_path);
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
        fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
      }
      return res.status(400).json({ error: "Stall name and address are required" });
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
      fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
    }

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Stall with this name already exists" });
    }

    res.status(500).json({ 
      error: "Failed to update stall",
      details: err.message 
    });
  }
});

// Delete stall
app.delete("/api/stalls/:id", async (req, res) => {
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
      const imagePath = path.join(__dirname, 'public', stall[0].image_path);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 3. Delete the stall from database
    const [result] = await pool.query(
      `DELETE FROM stalls WHERE stall_id = ?`, 
      [stallId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Stall not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Failed to delete stall",
      details: err.message 
    });
  }
});

// ________________________________________________________________________________________________

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Server startup
const port = process.env.PORT || 3000 ;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// ________________________________________________________________________________________________