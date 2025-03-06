"use strict";

var express = require('express');

var app = express();
var port = 3000;

var cors = require('cors');

var corsOption = {
  origin: ["http://localhost:5174"]
};
app.use(cors(corsOption));
app.get('/api', function (req, res) {
  res.json({
    message: "express test server.js"
  });
});
app.listen(port, function () {
  console.log("Server is running at http://localhost:".concat(port));
});