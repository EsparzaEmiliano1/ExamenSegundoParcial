const users = require('../data/users.js');
const activeSessions = require('../data/activeSessions.js');
const crypto = require('crypto');                          // Módulo nativo de Node.js para generar el token

// Función para manejar el login
const login = (req, res) => {
  // 1. Obtener cuenta y password del cuerpo de la petición
  const { cuenta, password } = req.body;

  // 2. Validar que nos enviaron ambos campos
  if (!cuenta || !password) {
    return res.status(400).json({ message: "La cuenta y la contraseña son requeridas." });  // codigo estado 400
  }

  // 3. Buscar al usuario en nuestro arreglo de datos
  const user = users.find(u => u.cuenta === cuenta);

  // 4. Validar si el usuario existe y la contraseña es correcta
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Error en las credenciales." }); 
  }

  // 5. Si el usuario es válido, creamos el token                                       // Aquí  
  const token = crypto.randomUUID(); 

  // 6. Guardamos la sesión en nuestro arreglo en memoria   
  activeSessions.push({
    token: token,
    userId: user.cuenta // Usamos la 'cuenta' como ID único del usuario
  });

  console.log('Sesión iniciada. Sesiones activas:', activeSessions);

  // 7. Preparamos los datos del usuario para enviarlos (sin el password)
  const userResponse = {
    cuenta: user.cuenta,
    nombreCompleto: user.nombreCompleto,
    haPagado: user.haPagado
  };

  // 8. Respondemos al frontend con el token y el usuario
  return res.status(200).json({                                  // Codigo estado 200
    message: "Acceso permitido.", 
    token: token,                                      // Aquí
    user: userResponse
  });
};

module.exports = {
  login
};