"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _promise = _interopRequireDefault(require("mysql2/promise"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

function createAdmin() {
  var connection, username, password, salt, passwordHash;
  return regeneratorRuntime.async(function createAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_promise["default"].createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          }));

        case 2:
          connection = _context.sent;
          username = ''; // Add your admin username here

          password = ''; // Add your admin password here

          _context.next = 7;
          return regeneratorRuntime.awrap(_bcryptjs["default"].genSalt(10));

        case 7:
          salt = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, salt));

        case 10:
          passwordHash = _context.sent;
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(connection.execute('INSERT INTO admins(username, password_hash) VALUES (?, ?)', [username, passwordHash]));

        case 14:
          console.log('Admin account created successfully!');
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](11);
          console.error('Error creating admin account:', _context.t0);

        case 20:
          _context.prev = 20;
          _context.next = 23;
          return regeneratorRuntime.awrap(connection.end());

        case 23:
          return _context.finish(20);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 17, 20, 24]]);
}

createAdmin();