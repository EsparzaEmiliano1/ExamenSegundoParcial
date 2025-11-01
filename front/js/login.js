// js/login.js

// Esperar a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Obtener referencias a los elementos del formulario
  const loginForm = document.getElementById('loginForm');
  const errorMessageDiv = document.getElementById('errorMessage');

  // 2. Añadir un "escuchador" para el evento 'submit' del formulario
  loginForm.addEventListener('submit', async (event) => {
    // Prevenir que el formulario se envíe de la forma tradicional
    event.preventDefault();

    // Limpiar mensajes de error previos
    errorMessageDiv.textContent = '';

    // 3. Obtener los valores de los campos
    const cuenta = document.getElementById('cuenta').value;
    const password = document.getElementById('password').value;

    try {
      // 4. Enviar la petición POST al backend usando fetch
      // Asegúrate de que la URL coincide con la de tu servidor backend
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cuenta: cuenta,
          password: password
        })
      });

      // 5. Convertir la respuesta a JSON
      const data = await response.json();

      // 6. Manejar la respuesta del servidor
      if (response.ok) {
        // ¡Éxito!
        console.log('Login exitoso:', data);
        
        // Guardar el token y los datos del usuario en localStorage
        localStorage.setItem('token', data.token); // Cita [36]
        localStorage.setItem('user', JSON.stringify(data.user)); // Guardamos al usuario también

        // Redirigir al usuario a la página principal
        window.location.href = 'index.html';

      } else {
        // Error (ej. 401 Credenciales incorrectas)
        console.error('Error en login:', data.message);
        errorMessageDiv.textContent = data.message;
      }

    } catch (error) {
      // Error de red (ej. el servidor backend no está corriendo)
      console.error('Error de conexión:', error);
      errorMessageDiv.textContent = 'No se pudo conectar con el servidor. ¿Está encendido?';
    }
  });
});