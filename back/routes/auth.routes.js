
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// Definimos la ruta de login
// Es POST porque el frontend nos envía datos (cuenta y password)
router.post('/login', authController.login);

module.exports = router;