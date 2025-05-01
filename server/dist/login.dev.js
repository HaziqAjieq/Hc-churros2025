"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

_dotenv["default"].config();

var express = require('express');

var router = express.Router();

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var _require = require('./server'),
    pool = _require.pool;

var rateLimit = require('express-rate-limit');

var loginLimiter = rateLimit({
  windowMs: 50 * 60 * 1000,
  message: 'Too many login attempts, please try again later',
  skipSuccessfulRequests: true
});
router.post('/api/admin/login', loginLimiter, function _callee(req, res) {
  var _req$body, username, password, _ref, _ref2, adminRows, admin, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;

          if (!(!username || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: 'Username and password are required'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.query('SELECT * FROM admins WHERE username = ?', [username]));

        case 6:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          adminRows = _ref2[0];

          if (!(adminRows.length === 0)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            success: false,
            message: 'Invalid credentials'
          }));

        case 11:
          admin = adminRows[0]; // 2. Verify password

          _context.next = 14;
          return regeneratorRuntime.awrap(bcrypt.compare(password, admin.password_hash));

        case 14:
          isPasswordValid = _context.sent;

          if (isPasswordValid) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            success: false,
            message: 'Invalid credentials'
          }));

        case 17:
          // 3. Create JWT token
          token = jwt.sign({
            id: admin.id,
            username: admin.username,
            role: 'admin'
          }, process.env.JWT_SECRET, {
            expiresIn: '8h'
          } // Token expires in 8 hours
          ); // 4. Set secure HTTP-only cookie (alternative to returning JSON)

          res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 8 * 60 * 60 * 1000 // 8 hours

          }); // 5. Return success response

          res.json({
            success: true,
            message: 'Login successful',
            token: token,
            // Also return token if you want to use localStorage
            admin: {
              id: admin.id,
              username: admin.username // Don't return sensitive data

            }
          });
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](3);
          console.error('Login error:', _context.t0);
          res.status(500).json({
            success: false,
            message: 'Internal server error'
          });

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 22]]);
});
module.exports = router;