
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller.js');

// Ruta para el formulario de contacto
// Es pública, cualquiera (incluso sin login) puede enviar un mensaje.
router.post('/', contactController.receiveMessage);

module.exports = router;