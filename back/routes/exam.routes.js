const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller.js');
const authRequired = require('../middleware/authRequired.js'); // Importar el middleware de autenticación

// Ruta para INICIAR el examen.
// authRequired se ejecuta primero. Si el token es válido, pasa a examController.startExam
router.post('/start', authRequired, examController.startExam);

// Ruta para ENVIAR (calificar) el examen.
router.post('/submit', authRequired, examController.submitExam); // protegida por authRequired.


module.exports = router;