"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _promise = _interopRequireDefault(require("mysql2/promise"));

var _cors = _interopRequireDefault(require("cors"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

_dotenv["default"].config();

// For __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
var app = (0, _express["default"])(); // Middleware

app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: "http://localhost:5174",
  // Changed to match typical React port
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Debug-Request'],
  exposedHeaders: ['set-cookie']
}));
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, 'public', 'uploads')));
app.use((0, _cookieParser["default"])()); // Database connection

var pool = _promise["default"].createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || 'hc_churros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}); //__________________________________________________________________________________
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


exports.pool = pool;
app.post('/api/admin/login', function _callee(req, res) {
  var _req$body, username, password, _ref, _ref2, rows, admin, isMatch, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // to check if user exist

          _context.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM admins WHERE username = ? ", [username]));

        case 4:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'Invalid credentials'
          }));

        case 9:
          admin = rows[0]; // Check password

          _context.next = 12;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, admin.password_hash));

        case 12:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'Invalid credentials'
          }));

        case 15:
          // Create JWT token
          token = _jsonwebtoken["default"].sign({
            username: admin.username
          }, JWT_SECRET, {
            expiresIn: '2h'
          });
          res.json({
            token: token,
            username: admin.username
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            error: 'Server error'
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}); // Protected admin route

app.get('/api/admin/data', authenticateToken, function (req, res) {
  res.json({
    message: 'Hello admin',
    user: req.user
  });
}); // Middleware to authenticate JWT token

function authenticateToken(req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  _jsonwebtoken["default"].verify(token, JWT_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
} //___________________________________________________________________________________
// Configure Multer for file uploads


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    var uploadPath = _path["default"].join(__dirname, 'public', 'uploads'); // Create directory if it doesn't exist


    if (!_fs["default"].existsSync(uploadPath)) {
      _fs["default"].mkdirSync(uploadPath, {
        recursive: true
      });
    }

    cb(null, uploadPath);
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    var ext = _path["default"].extname(file.originalname);

    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit

  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var extname = filetypes.test(_path["default"].extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images only! (JPEG, JPG, PNG, GIF)'));
    }
  }
}); // API Endpoints
// Get all churros stalls

app.get("/api/stalls", function _callee2(req, res) {
  var _ref3, _ref4, rows;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT stall_id, stall_name, address, google_maps_url, image_path \n      FROM stalls\n      ORDER BY stall_name"));

        case 3:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];
          res.json(rows);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            error: "Server error"
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Get single stall

app.get("/api/stalls/:id", function _callee3(req, res) {
  var _ref5, _ref6, rows;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT stall_id, stall_name, address, google_maps_url, image_path \n      FROM stalls \n      WHERE stall_id = ?", [req.params.id]));

        case 3:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          rows = _ref6[0];

          if (!(rows.length === 0)) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 8:
          res.json(rows[0]);
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            error: "Server error"
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Add new stall

app.post("/api/stalls", upload.single('image'), function _callee4(req, res) {
  var _req$body2, stall_name, address, google_maps_url, image_path, _ref7, _ref8, result, _ref9, _ref10, rows;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, stall_name = _req$body2.stall_name, address = _req$body2.address, google_maps_url = _req$body2.google_maps_url; // Validate required fields

          if (!(!stall_name || !address)) {
            _context4.next = 5;
            break;
          }

          if (req.file) {
            _fs["default"].unlinkSync(_path["default"].join(__dirname, 'public', 'uploads', req.file.filename));
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Stall name and address are required"
          }));

        case 5:
          image_path = req.file ? "/uploads/".concat(req.file.filename) : null;
          _context4.next = 8;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO stalls (stall_name, address, google_maps_url, image_path)\n       VALUES (?, ?, ?, ?)", [stall_name, address, google_maps_url, image_path]));

        case 8:
          _ref7 = _context4.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          result = _ref8[0];
          _context4.next = 13;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM stalls WHERE stall_id = ?", [result.insertId]));

        case 13:
          _ref9 = _context4.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          rows = _ref10[0];
          res.status(201).json(rows[0]);
          _context4.next = 26;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0); // Delete uploaded file if error occurred

          if (req.file) {
            _fs["default"].unlinkSync(_path["default"].join(__dirname, 'public', 'uploads', req.file.filename));
          }

          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 25;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Stall with this name already exists"
          }));

        case 25:
          res.status(500).json({
            error: "Failed to add stall",
            details: _context4.t0.message
          });

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 19]]);
}); // Update stall (with image handling)

app.put("/api/stalls/:id", upload.single('image'), function _callee5(req, res) {
  var stallId, _ref11, _ref12, existingStall, image_path, oldImagePath, _req$body3, stall_name, address, google_maps_url, _ref13, _ref14, rows;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          stallId = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM stalls WHERE stall_id = ?", [stallId]));

        case 4:
          _ref11 = _context5.sent;
          _ref12 = _slicedToArray(_ref11, 1);
          existingStall = _ref12[0];

          if (!(existingStall.length === 0)) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 9:
          // 2. Handle the image update
          image_path = existingStall[0].image_path;

          if (req.file) {
            // Delete old image if it exists
            if (existingStall[0].image_path) {
              oldImagePath = _path["default"].join(__dirname, 'public', existingStall[0].image_path);

              if (_fs["default"].existsSync(oldImagePath)) {
                _fs["default"].unlinkSync(oldImagePath);
              }
            } // Set new image path


            image_path = "/uploads/".concat(req.file.filename);
          } // 3. Update the stall


          _req$body3 = req.body, stall_name = _req$body3.stall_name, address = _req$body3.address, google_maps_url = _req$body3.google_maps_url;

          if (!(!stall_name || !address)) {
            _context5.next = 15;
            break;
          }

          if (req.file) {
            _fs["default"].unlinkSync(_path["default"].join(__dirname, 'public', 'uploads', req.file.filename));
          }

          return _context5.abrupt("return", res.status(400).json({
            error: "Stall name and address are required"
          }));

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(pool.query("UPDATE stalls \n       SET stall_name = ?, address = ?, google_maps_url = ?, image_path = ?\n       WHERE stall_id = ?", [stall_name, address, google_maps_url, image_path, stallId]));

        case 17:
          _context5.next = 19;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM stalls WHERE stall_id = ?", [stallId]));

        case 19:
          _ref13 = _context5.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          rows = _ref14[0];
          res.json(rows[0]);
          _context5.next = 32;
          break;

        case 25:
          _context5.prev = 25;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0); // Delete uploaded file if error occurred

          if (req.file) {
            _fs["default"].unlinkSync(_path["default"].join(__dirname, 'public', 'uploads', req.file.filename));
          }

          if (!(_context5.t0.code === 'ER_DUP_ENTRY')) {
            _context5.next = 31;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            error: "Stall with this name already exists"
          }));

        case 31:
          res.status(500).json({
            error: "Failed to update stall",
            details: _context5.t0.message
          });

        case 32:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 25]]);
}); // Delete stall

app["delete"]("/api/stalls/:id", function _callee6(req, res) {
  var stallId, _ref15, _ref16, stall, imagePath, _ref17, _ref18, result;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          stallId = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT image_path FROM stalls WHERE stall_id = ?", [stallId]));

        case 4:
          _ref15 = _context6.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          stall = _ref16[0];

          if (!(stall.length === 0)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 9:
          // 2. Delete the image file if it exists
          if (stall[0].image_path) {
            imagePath = _path["default"].join(__dirname, 'public', stall[0].image_path);

            if (_fs["default"].existsSync(imagePath)) {
              _fs["default"].unlinkSync(imagePath);
            }
          } // 3. Delete the stall from database


          _context6.next = 12;
          return regeneratorRuntime.awrap(pool.query("DELETE FROM stalls WHERE stall_id = ?", [stallId]));

        case 12:
          _ref17 = _context6.sent;
          _ref18 = _slicedToArray(_ref17, 1);
          result = _ref18[0];

          if (!(result.affectedRows === 0)) {
            _context6.next = 17;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 17:
          res.json({
            success: true
          });
          _context6.next = 24;
          break;

        case 20:
          _context6.prev = 20;
          _context6.t0 = _context6["catch"](1);
          console.error(_context6.t0);
          res.status(500).json({
            error: "Failed to delete stall",
            details: _context6.t0.message
          });

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 20]]);
}); // ________________________________________________________________________________________________
// Error handling middleware

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!'
  });
}); // Server startup

var port = process.env.PORT;
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
}); // ________________________________________________________________________________________________