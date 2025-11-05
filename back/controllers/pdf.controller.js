const PDFDocument = require('pdfkit');
const users = require('../data/users.js');
const path = require('path'); // <-- 1. Importa el módulo 'path'

const downloadCertificate = (req, res) => {
  // 1. Identificar al usuario
  const userAccount = req.userId;
  const user = users.find(u => u.cuenta === userAccount);

  // 2. Validar si el usuario tiene derecho al PDF
  if (!user || !user.aprobo) {
    return res.status(403).json({ 
      message: "No puedes descargar un certificado. No has aprobado el examen." 
    });
  }

  // 3. --- Definir rutas a las imágenes en el BACKEND ---
  const logoPath = path.join(__dirname, '..', 'imagenes', 'logo.png');
  const signaturePath = path.join(__dirname, '..', 'imagenes', 'firma.png');


  // 4. Crear el documento PDF
  const doc = new PDFDocument({
    size: 'LETTER',
    layout: 'landscape' // Orientación horizontal
  });

  // 5. Definir el nombre del archivo
  const filename = `Certificado-${user.cuenta}.pdf`;
  
  // 6. Configurar los headers de la respuesta
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // 7. Enviar el PDF directamente a la respuesta
  doc.pipe(res);

  // 8. --- Contenido del PDF (Versión Actualizada) ---

  // Fondo (ejemplo simple)
  doc.rect(0, 0, doc.page.width, doc.page.height).fillColor('#f0f8ff').fill();
  doc.fillColor('#000');

  // --- LOGO DE LA COMPAÑÍA ---
  // (Asegúrate de que 'favicon.png' esté en 'backend/assets/')
  try {
    doc.image(logoPath, {
      fit: [80, 80], // Ajustar a 80x80px
      align: 'center',
      x: doc.page.width / 2 - 40, // Centrado
      y: 50 // Cerca de la parte superior
    });
  } catch (error) {
    console.error("No se pudo cargar el logo:", error.message);
    doc.text('Logo no encontrado', doc.page.width / 2 - 40, 50);
  }
  

  // Título
  doc.fontSize(32).font('Helvetica-Bold').text('CERTIFICADO DE COMPETENCIA', {
    align: 'center',
    y: 150 // Lo bajamos un poco para dar espacio al logo
  });

  doc.fontSize(18).font('Helvetica').text('Otorgado a:', {
    align: 'center',
    y: 220
  });

  // Nombre del usuario 
  doc.fontSize(28).font('Helvetica-Bold').fillColor('#003366').text(user.nombreCompleto, {
    align: 'center',
    y: 260
  });
  doc.fillColor('#000'); 

  // Nombre de la certificación 
  doc.fontSize(20).font('Helvetica').text('Por haber completado exitosamente la certificación:', {
    align: 'center',
    y: 330
  });
  doc.fontSize(24).font('Helvetica-Bold').text('Certified Web Systems Developer', {
    align: 'center',
    y: 360
  });

  // Fecha 
  const today = new Date().toLocaleDateString('es-MX', { dateStyle: 'long' });
  doc.fontSize(16).font('Helvetica').text(`Aguascalientes, Ags. a ${today}`, {
    align: 'center',
    y: 410 // Lo bajamos un poco
  });

  // --- Firmas (Movidas más arriba para evitar el bug de 5 páginas) ---
  const signatureY = 460; // Posición Y base para las firmas

  doc.fontSize(14).text('Emiliano Esparza', 100, signatureY + 30, { align: 'left' });
  doc.text('_______________________', 100, signatureY + 35, { align: 'left' });
  doc.text('Instructor Principal', 100, signatureY + 55, { align: 'left' });
  
  // Firma 
  try {
    doc.image(signaturePath, {
      fit: [250, 60], // Ajusta el tamaño
      x: 150,
      y: signatureY - 40 // Un poco arriba del texto
    });
  } catch (error) {
    console.error("No se pudo cargar la firma:", error.message);
    doc.text('(Firma no encontrada)', 100, signatureY, { align: 'left' });
  }

  // --- NOMBRE DE LA COMPAÑÍA (DevCerts) ---
  doc.fontSize(14).font('Helvetica-Bold').text('DevCerts', 550, signatureY + 30, { align: 'right' });
  doc.text('_______________________', 550, signatureY + 35, { align: 'right' });
  doc.text('Compañía Certificadora', 550, signatureY + 55, { align: 'right' });


  // 9. Finalizar el PDF
  doc.end();
};

module.exports = {
  downloadCertificate
};

/* Para probar lo que nos da el endpoint de descarga del PDF
// Pega esto en la consola del navegador
const token = localStorage.getItem('token');
fetch('http://localhost:3000/api/certs/download', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(response => response.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test-certificado.pdf';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
  console.log('PDF de prueba descargado.');
})
.catch(err => console.error('Error al descargar:', err));
*/