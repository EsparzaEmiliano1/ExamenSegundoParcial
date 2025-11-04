document.addEventListener('DOMContentLoaded', () => {

  // Obtenemos los botones de la certificación que SÍ funciona
  const btnPagar = document.querySelector('.btn-pay[data-cert-id="js-dev"]');
  const btnIniciar = document.querySelector('.btn-start[data-cert-id="js-dev"]');

  // --- 1. LÓGICA DEL BOTÓN "PAGAR" ---
  if (btnPagar) {
    btnPagar.addEventListener('click', async () => {
      
      // a. Verificar si el usuario está logueado
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          title: 'Error',
          text: 'Debes iniciar sesión para poder pagar el examen.', 
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return; // Detenemos la ejecución
      }

      // b. Si está logueado, intentamos simular el pago
      try {
        const response = await fetch('http://localhost:3000/api/users/pay', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}` // ¡Enviamos el token!
          }
        });

        const data = await response.json();

        if (response.ok) {
          // ¡Pago exitoso!
          Swal.fire({
            title: '¡Pago Exitoso!',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Genial'
          });
          
          // Actualizamos el estado del usuario en localStorage
          // Esto es clave para que el botón "Iniciar Examen" funcione
          localStorage.setItem('user', JSON.stringify(data.user));

        } else {
          // Error (ej ya había pagado o token inválido)
          Swal.fire({
            title: 'Error en el Pago',
            text: data.message, 
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        console.error('Error al procesar pago:', error);
        Swal.fire({
          title: 'Error de Conexión',
          text: 'No se pudo conectar con el servidor.',
          icon: 'error'
        });
      }
    });
  }

  // --- 2. LÓGICA DEL BOTÓN "INICIAR EXAMEN" ---
  if (btnIniciar) {
    btnIniciar.addEventListener('click', () => {
      
      // a. Revisar si el usuario está logueado
      const token = localStorage.getItem('token');
      const userJson = localStorage.getItem('user');
      
      if (!token || !userJson) {
        Swal.fire({
          title: 'Acceso Denegado',
          text: 'Debes iniciar sesión para comenzar el examen.', 
          icon: 'warning'
        });
        return;
      }

      // b. Revisar si el usuario ya pagó
      try {
        const user = JSON.parse(userJson);
        
        if (user.haPagado) {
          // ¡Todo en orden! Redirigimos a la página del examen
          window.location.href = 'examen.html';
        } else {
          // No ha pagado
          Swal.fire({
            title: 'Acceso Denegado',
            text: 'Debes pagar el examen antes de poder iniciarlo.', 
            icon: 'warning'
          });
        }
      } catch (e) {
        console.error('Error al parsear datos de usuario:', e);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema con tu sesión. Intenta iniciar sesión de nuevo.',
          icon: 'error'
        });
      }
    });
  }
});