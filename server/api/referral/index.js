var express = require('express');
var router = express.Router();
var controller = require('./referral.controller');

// Create a new Referral
router.post('/', controller.create);

// Checks a single Referral by code
router.get('/check/:code', controller.check);

// Update a Referral with Id
router.put('/:code', controller.update);

module.exports = router;
