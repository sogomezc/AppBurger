// Este script se encarga de cargar componentes reutilizables y aplicar la lógica necesaria.

function cargarHeader() {
    // 1. Buscamos el header en la raíz del proyecto (ajusta la ruta si es necesario)
    // Basado en tu código, la ruta es '/componentes/header.html'
    fetch('/componentes/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el header. Revisa la ruta.");
            }
            return response.text();
        })
        .then(html => {
            // 2. Inyectamos el HTML del header en el div#header
            document.getElementById('header').innerHTML = html;

            // 3. ¡AQUÍ ESTÁ LA MAGIA!
            // Justo después de inyectar el HTML, ejecutamos la lógica condicional.
            // Ya no necesitamos esperar ni usar setInterval.
            actualizarEstadoHeader();
        })
        .catch(error => {
            console.error(error);
            document.getElementById('header').innerText = "Error al cargar el header.";
        });
}

function actualizarEstadoHeader() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const userNameSpan = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');

    // Revisamos localStorage para ver si el usuario está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'Cliente';

    // Aseguramos que los elementos existan antes de manipularlos
    if (loginBtn && userMenu && userNameSpan && logoutBtn) {
        if (isLoggedIn) {
            // Usuario logueado: Oculta "Iniciar sesión" y muestra el menú
            loginBtn.classList.add('d-none');
            userMenu.classList.remove('d-none');
            userNameSpan.textContent = userName;
        } else {
            // Usuario no logueado: Muestra "Iniciar sesión" y oculta el menú
            loginBtn.classList.remove('d-none');
            userMenu.classList.add('d-none');
        }

        // --- Añadimos los event listeners aquí ---

        // Guardar la página actual antes de ir al login
        loginBtn.addEventListener('click', function() {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
        });
        
        // Cerrar sesión
        logoutBtn.addEventListener('click', () => {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('userName');
            window.location.reload(); // Recarga la página para reflejar el cambio
        });
    }
}

// Ejecutamos la función principal cuando el DOM está listo
document.addEventListener('DOMContentLoaded', cargarHeader);