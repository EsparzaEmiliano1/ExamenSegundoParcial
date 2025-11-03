// Usamos 'DOMContentLoaded' para asegurarnos de que el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

  // Referencias a los elementos del header
  const userLoginLink = document.getElementById('user-login-link');
  const userDisplayName = document.getElementById('user-display-name');
  const userLogoutLink = document.getElementById('user-logout-link');

  // 1. REVISAR EL ESTADO DE LOGIN
  // Buscamos los datos guardados en localStorage
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  
  if (token && userJson) {
    // Si el usuario ESTÁ logueado:
    try {
      const user = JSON.parse(userJson);

      // a. Mostramos su nombre
      userDisplayName.textContent = `Hola, ${user.cuenta}`;
      userDisplayName.classList.remove('hidden');

      // b. Mostramos el enlace de "Cerrar Sesión"
      userLogoutLink.classList.remove('hidden');

      // c. Ocultamos el de "Iniciar Sesión"
      userLoginLink.classList.add('hidden');

    } catch (e) {
      // Si hay un error en los datos guardados, limpiamos todo
      console.error("Error al parsear datos de usuario:", e);
      logout(); // Llamamos a la función de logout para limpiar
    }
  } else {
    // Si el usuario NO ESTÁ logueado:
    
    // a. Nos aseguramos de que "Iniciar Sesión" esté visible
    userLoginLink.classList.remove('hidden');

    // b. Nos aseguramos de que el nombre y el logout estén ocultos
    userDisplayName.classList.add('hidden');
    userLogoutLink.classList.add('hidden');
  }

  // 2. CONFIGURAR EL BOTÓN DE LOGOUT
  if (userLogoutLink) {
    userLogoutLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevenir que el enlace '#' recargue la página
      logout();
    });
  }
});

/**
 * Función de Logout
 * Limpia el localStorage y redirige al index.
 */
function logout() {
  // Borramos los datos de la sesión
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  window.location.href = 'index.html';
}