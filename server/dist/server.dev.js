"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

require("dotenv").config();

var express = require("express");

var mysql = require("mysql2/promise");

var cors = require("cors");

var multer = require('multer');

var path = require('path');

var fs = require('fs'); // for user auth


var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var cookieParser = require('cookie-parser');

var _require = require("console"),
    error = _require.error;

var app = express(); // Middleware

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174",
  // Changed to match typical React port
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Debug-Request'],
  exposedHeaders: ['set-cookie']
}));
app.use('/uploads', express["static"](path.join(__dirname, 'public', 'uploads')));
app.use(cookieParser()); // Database connection

var pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || 'hc_churros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}); //__________________________________________________________________________________
//___________________________________________________________________________________
// Configure Multer for file uploads

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var uploadPath = path.join(__dirname, 'public', 'uploads'); // Create directory if it doesn't exist

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {
        recursive: true
      });
    }

    cb(null, uploadPath);
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    var ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit

  },
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    var mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images only! (JPEG, JPG, PNG, GIF)'));
    }
  }
}); // API Endpoints
// Get all churros stalls

app.get("/api/stalls", function _callee(req, res) {
  var _ref, _ref2, rows;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT stall_id, stall_name, address, google_maps_url, image_path \n      FROM stalls\n      ORDER BY stall_name"));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          res.json(rows);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            error: "Server error"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Get single stall

app.get("/api/stalls/:id", function _callee2(req, res) {
  var _ref3, _ref4, rows;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT stall_id, stall_name, address, google_maps_url, image_path \n      FROM stalls \n      WHERE stall_id = ?", [req.params.id]));

        case 3:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];

          if (!(rows.length === 0)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 8:
          res.json(rows[0]);
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            error: "Server error"
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Add new stall

app.post("/api/stalls", upload.single('image'), function _callee3(req, res) {
  var _req$body, stall_name, address, google_maps_url, image_path, _ref5, _ref6, result, _ref7, _ref8, rows;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, stall_name = _req$body.stall_name, address = _req$body.address, google_maps_url = _req$body.google_maps_url; // Validate required fields

          if (!(!stall_name || !address)) {
            _context3.next = 5;
            break;
          }

          if (req.file) {
            fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
          }

          return _context3.abrupt("return", res.status(400).json({
            error: "Stall name and address are required"
          }));

        case 5:
          image_path = req.file ? "/uploads/".concat(req.file.filename) : null;
          _context3.next = 8;
          return regeneratorRuntime.awrap(pool.query("INSERT INTO stalls (stall_name, address, google_maps_url, image_path)\n       VALUES (?, ?, ?, ?)", [stall_name, address, google_maps_url, image_path]));

        case 8:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          result = _ref6[0];
          _context3.next = 13;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM stalls WHERE stall_id = ?", [result.insertId]));

        case 13:
          _ref7 = _context3.sent;
          _ref8 = _slicedToArray(_ref7, 1);
          rows = _ref8[0];
          res.status(201).json(rows[0]);
          _context3.next = 26;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0); // Delete uploaded file if error occurred

          if (req.file) {
            fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
          }

          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 25;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: "Stall with this name already exists"
          }));

        case 25:
          res.status(500).json({
            error: "Failed to add stall",
            details: _context3.t0.message
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
}); // Update stall (with image handling)

app.put("/api/stalls/:id", upload.single('image'), function _callee4(req, res) {
  var stallId, _ref9, _ref10, existingStall, image_path, oldImagePath, _req$body2, stall_name, address, google_maps_url, _ref11, _ref12, rows;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          stallId = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM stalls WHERE stall_id = ?", [stallId]));

        case 4:
          _ref9 = _context4.sent;
          _ref10 = _slicedToArray(_ref9, 1);
          existingStall = _ref10[0];

          if (!(existingStall.length === 0)) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 9:
          // 2. Handle the image update
          image_path = existingStall[0].image_path;

          if (req.file) {
            // Delete old image if it exists
            if (existingStall[0].image_path) {
              oldImagePath = path.join(__dirname, 'public', existingStall[0].image_path);

              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            } // Set new image path


            image_path = "/uploads/".concat(req.file.filename);
          } // 3. Update the stall


          _req$body2 = req.body, stall_name = _req$body2.stall_name, address = _req$body2.address, google_maps_url = _req$body2.google_maps_url;

          if (!(!stall_name || !address)) {
            _context4.next = 15;
            break;
          }

          if (req.file) {
            fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Stall name and address are required"
          }));

        case 15:
          _context4.next = 17;
          return regeneratorRuntime.awrap(pool.query("UPDATE stalls \n       SET stall_name = ?, address = ?, google_maps_url = ?, image_path = ?\n       WHERE stall_id = ?", [stall_name, address, google_maps_url, image_path, stallId]));

        case 17:
          _context4.next = 19;
          return regeneratorRuntime.awrap(pool.query("SELECT * FROM stalls WHERE stall_id = ?", [stallId]));

        case 19:
          _ref11 = _context4.sent;
          _ref12 = _slicedToArray(_ref11, 1);
          rows = _ref12[0];
          res.json(rows[0]);
          _context4.next = 32;
          break;

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](1);
          console.error(_context4.t0); // Delete uploaded file if error occurred

          if (req.file) {
            fs.unlinkSync(path.join(__dirname, 'public', 'uploads', req.file.filename));
          }

          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 31;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: "Stall with this name already exists"
          }));

        case 31:
          res.status(500).json({
            error: "Failed to update stall",
            details: _context4.t0.message
          });

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 25]]);
}); // Delete stall

app["delete"]("/api/stalls/:id", function _callee5(req, res) {
  var stallId, _ref13, _ref14, stall, imagePath, _ref15, _ref16, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          stallId = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(pool.query("SELECT image_path FROM stalls WHERE stall_id = ?", [stallId]));

        case 4:
          _ref13 = _context5.sent;
          _ref14 = _slicedToArray(_ref13, 1);
          stall = _ref14[0];

          if (!(stall.length === 0)) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 9:
          // 2. Delete the image file if it exists
          if (stall[0].image_path) {
            imagePath = path.join(__dirname, 'public', stall[0].image_path);

            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          } // 3. Delete the stall from database


          _context5.next = 12;
          return regeneratorRuntime.awrap(pool.query("DELETE FROM stalls WHERE stall_id = ?", [stallId]));

        case 12:
          _ref15 = _context5.sent;
          _ref16 = _slicedToArray(_ref15, 1);
          result = _ref16[0];

          if (!(result.affectedRows === 0)) {
            _context5.next = 17;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: "Stall not found"
          }));

        case 17:
          res.json({
            success: true
          });
          _context5.next = 24;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0);
          res.status(500).json({
            error: "Failed to delete stall",
            details: _context5.t0.message
          });

        case 24:
        case "end":
          return _context5.stop();
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

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server running on port ".concat(port));
}); // ________________________________________________________________________________________________