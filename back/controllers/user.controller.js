const users = require('../data/users.js');

const simulatePayment = (req, res) => {
  // 1. Identificar al usuario (gracias al middleware)
  const userAccount = req.userId;
  const user = users.find(u => u.cuenta === userAccount);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado." });
  }

  // 2. Revisar si ya pagó (evitar pagos dobles) 
  if (user.haPagado) {
    return res.status(400).json({ message: "Este examen ya ha sido pagado." });
  }

  // 3. Actualizar la bandera en memoria
  user.haPagado = true;

  console.log(`Pago simulado recibido para: ${user.cuenta}`);

  // 4. Responder al frontend
  res.status(200).json({ 
    message: "Pago simulado exitoso.",
    user: {
      cuenta: user.cuenta,
      haPagado: user.haPagado,
      nombreCompleto: user.nombreCompleto
    }
  });
};

module.exports = {
  simulatePayment
};