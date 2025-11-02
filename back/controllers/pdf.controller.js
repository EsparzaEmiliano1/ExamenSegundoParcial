const PDFDocument = require('pdfkit');
const users = require('../data/users.js');

const downloadCertificate = (req, res) => {
  // 1. Identificar al usuario (gracias al middleware)
  const userAccount = req.userId;
  const user = users.find(u => u.cuenta === userAccount);

  // 2. Validar si el usuario tiene derecho al PDF
  if (!user || !user.aprobo) {
    return res.status(403).json({ 
      message: "No puedes descargar un certificado. No has aprobado el examen." 
    });
  }

  // 3. Si aprobó, crear el documento PDF
  const doc = new PDFDocument({
    size: 'LETTER', // Tamaño carta
    layout: 'landscape' // Orientación horizontal
  });

  // 4. Definir el nombre del archivo
  const filename = `Certificado-${user.cuenta}.pdf`;
  
  // 5. Configurar los headers de la respuesta
  // Esto le dice al navegador que es un archivo PDF para descargar
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // 6. Enviar el PDF directamente a la respuesta (al navegador)
  doc.pipe(res);

  // 7. --- Contenido del PDF ---
  // (Este es un diseño básico. ¡Puedes ponerte creativo!)

  // Fondo (ejemplo simple)
  doc.rect(0, 0, doc.page.width, doc.page.height).fillColor('#f0f8ff').fill();
  doc.fillColor('#000'); // Resetear color de texto

  // Título
  doc.fontSize(32).font('Helvetica-Bold').text('CERTIFICADO DE COMPETENCIA', {
    align: 'center',
    y: 100
  });

  doc.fontSize(18).font('Helvetica').text('Otorgado a:', {
    align: 'center',
    y: 180
  });

  // Nombre del usuario (Cita [121])
  doc.fontSize(28).font('Helvetica-Bold').fillColor('#003366').text(user.nombreCompleto, {
    align: 'center',
    y: 220
  });
  doc.fillColor('#000'); // Resetear

  // Nombre de la certificación (Cita [122])
  doc.fontSize(20).font('Helvetica').text('Por haber completado exitosamente la certificación:', {
    align: 'center',
    y: 300
  });
  doc.fontSize(24).font('Helvetica-Bold').text('Certified Web Systems Developer', {
    align: 'center',
    y: 330
  });

  // Fecha (Cita [123]) y Ciudad (Cita [124])
  const today = new Date().toLocaleDateString('es-MX', { dateStyle: 'long' });
  doc.fontSize(16).font('Helvetica').text(`Aguascalientes, Ags. a ${today}`, {
    align: 'center',
    y: 400
  });

  // Nombres y Firmas (Simuladas con texto) (Cita [126])
  doc.fontSize(14).text('Dra. Georgina Salazar Partida', 100, 500, { align: 'left' });
  doc.text('_______________________', 100, 515, { align: 'left' });
  doc.text('Instructora (CEO)', 100, 535, { align: 'left' });
  
  // Nombre de la compañía (Cita [125])
  doc.fontSize(14).text('Tu Empresa de Certificaciones', 550, 500, { align: 'right' });
  doc.text('_______________________', 550, 515, { align: 'right' });
  doc.text('Nombre del CEO', 550, 535, { align: 'right' });


  // 8. Finalizar el PDF
  doc.end();
};

module.exports = {
  downloadCertificate
};