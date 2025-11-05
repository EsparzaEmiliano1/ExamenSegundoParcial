const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authRequired = require('../middleware/authRequired.js');

// Ruta para simular el pago
// Es POST porque estamos "creando" un pago (modificando un estado)
router.post('/pay', authRequired, userController.simulatePayment); // protegida por authRequired.

module.exports = router;