// backend/routes/pdf.routes.js

const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf.controller.js');
const authRequired = require('../middleware/authRequired.js'); // El guardia

// Ruta para descargar el certificado
// Es GET porque solo estamos pidiendo (descargando) datos
// Y está protegida, ¡solo usuarios logueados pueden descargar!
router.get('/download', authRequired, pdfController.downloadCertificate);

module.exports = router;