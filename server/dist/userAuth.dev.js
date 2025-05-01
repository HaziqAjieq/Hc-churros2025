"use strict";

var bcrypt = require('bcryptjs');

var mysql = require('mysql2/promise.js');

require('dotenv').config();

function createAdmin() {
  var connection, username, password, salt, passwordHash;
  return regeneratorRuntime.async(function createAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          }));

        case 2:
          connection = _context.sent;
          username = 'Admin-Churros1';
          password = 'WAN-HC123@';
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 7:
          salt = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 10:
          passwordHash = _context.sent;
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(connection.execute('INSERT INTO admins(username,password_hash) VALUES (? , ?)', [username, passwordHash]));

        case 14:
          console.log('Admin acc created!');
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](11);
          console.error('Error creating admin acc:', _context.t0);

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