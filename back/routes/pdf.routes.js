
const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf.controller.js');
const authRequired = require('../middleware/authRequired.js'); // El guardia

// Ruta para descargar el certificado
// Es GET porque solo estamos pidiendo (descargando) datos
router.get('/download', authRequired, pdfController.downloadCertificate); // protegida por authRequired.

module.exports = router;