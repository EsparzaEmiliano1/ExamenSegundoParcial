document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      // 1. Prevenir que el formulario se envíe de forma tradicional
      event.preventDefault();

      // 2. Obtener los valores de los campos
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje').value;

      try {
        // 3. Enviar los datos al backend (API pública)
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: nombre,
            email: email,
            mensaje: mensaje
          })
        });

        const data = await response.json();

        if (response.ok) {
          // 4. ¡Éxito! Mostrar alerta "Mensaje Enviado" 
          Swal.fire({
            title: '¡Gracias!',
            text: data.message, // "Mensaje Enviado"
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          // 5. Limpiar el formulario
          contactForm.reset();

        } else {
          // Error del servidor (ej. campos vacíos)
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error'
          });
        }

      } catch (error) {
        // Error de red
        console.error('Error al enviar mensaje:', error);
        Swal.fire({
          title: 'Error de Conexión',
          text: 'No se pudo conectar con el servidor.',
          icon: 'error'
        });
      }
    });
  }
});