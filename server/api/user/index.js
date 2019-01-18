var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

// Create a new User
router.post('/', controller.create);

// Checks an emails already exists
router.get('/exists/:email', controller.exists);

// Login a User
router.post('/login', controller.login);

module.exports = router;
