const activeSessions = require('../data/activeSessions');

/**
 * Este es el middleware "candado".
 * Revisa el header 'Authorization' para un token válido.
 */
const authRequired = (req, res, next) => {
  // 1. Obtener el header de autorización
  const authHeader = req.headers['authorization']; // Cita [157]

  // 2. Verificar si el header existe
  if (!authHeader) {
    return res.status(401).json({ message: 'No hay token, autorización denegada.' });
  }

  // 3. El token debe venir como "Bearer <token>"
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token malformado.' });
  }

  const token = tokenParts[1];

  // 4. Buscar el token en nuestras sesiones activas en memoria
  const session = activeSessions.find(s => s.token === token);

  // 5. Si no encontramos la sesión, el token no es válido
  if (!session) {
    return res.status(401).json({ message: 'Token no válido o sesión expirada.' }); // Cita [157]
  }

  // 6. ¡Éxito! El token es válido.
  // Adjuntamos el ID del usuario al objeto 'req'
  // para que la siguiente función (el controlador) sepa QUIÉN está haciendo la petición.
  req.userId = session.userId; // Cita [157] (set req.userId)

  // 7. Dejamos pasar la petición al siguiente controlador
  next();
};

module.exports = authRequired;