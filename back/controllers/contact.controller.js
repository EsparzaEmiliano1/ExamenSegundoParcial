
// Este arreglo guardará los mensajes en memoria 
const contactMessages = [];

const receiveMessage = (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  const newMessage = {
    nombre,
    email,
    mensaje,
    fecha: new Date().toISOString()
  };

  // Guardamos el mensaje en nuestro arreglo en memoria
  contactMessages.push(newMessage);

  // Imprimimos el arreglo completo en la consola del servidor CADA VEZ 
  console.log("--- Nuevo Mensaje de Contacto Recibido ---");
  console.log(contactMessages);
  console.log("-------------------------------------------");

  // Respondemos al front para que muestre el alert
  res.status(200).json({ message: "Mensaje Enviado" }); // 
};

module.exports = {
  receiveMessage
};