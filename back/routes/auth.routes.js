
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// Login
// Es POST porque el frontend nos envía datos (cuenta y password)
router.post('/login', authController.login);

module.exports = router;