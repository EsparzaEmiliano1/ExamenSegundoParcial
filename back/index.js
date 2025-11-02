// Servidor principal

const express = require('express');
const cors = require('cors');

// Importar nuestras rutas
const authRoutes = require('./routes/auth.routes.js');
const examRoutes = require('./routes/exam.routes.js');
const pdfRoutes = require('./routes/pdf.routes.js');
const userRoutes = require('./routes/user.routes.js'); 
const contactRoutes = require('./routes/contact.routes.js');

// Inicializar la aplicación de Express
const app = express();
const PORT = 3000; // Puerto donde correrá el servidor

// --- Middlewares ---
// 1. Para permitir peticiones desde cualquier origen (tu frontend)
app.use(cors());
// 2. Para poder entender los JSON que nos envía el frontend
app.use(express.json());

// --- Rutas ---
// Le decimos a nuestra app que use las rutas de autenticación
// Todas las rutas en 'authRoutes' comenzarán con '/api/auth'
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/certs', pdfRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/contact', contactRoutes);

// --- Iniciar el servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});