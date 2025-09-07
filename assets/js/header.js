document.addEventListener('DOMContentLoaded', () => {
  // Espera a que el header y sus elementos estén listos en el DOM
  const checkHeaderReady = setInterval(() => {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userNameSpan = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'Cliente';

    if (loginBtn && userMenu && userNameSpan && logoutBtn) {
      clearInterval(checkHeaderReady);

      // Mostrar u ocultar según el estado de login
      if (isLoggedIn) {
        loginBtn.classList.add('d-none');
        userMenu.classList.remove('d-none');
        userNameSpan.textContent = userName;
      } else {
        loginBtn.classList.remove('d-none');
        userMenu.classList.add('d-none');
      }

      // Cerrar sesión
      logoutBtn.addEventListener('click', () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userName');
        location.reload();
      });

      // Guardar la página actual antes de ir al login
      loginBtn.addEventListener('click', function() {
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
      });
    }
  }, 50);
});