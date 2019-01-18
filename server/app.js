var mongoose = require('mongoose');
var express = require('express');
var app = express();
var expressConfig = require('./config/express');
var registerRoutes = require('./routes');

const config = require('./config');

mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on('error', function (err) {
  console.error(`MongoDB connection error: ${err}`);
});

expressConfig(app);
registerRoutes(app);

// Create a Server
app.listen(config.port, function () {
  console.log("Server listening on port:", config.port)
})