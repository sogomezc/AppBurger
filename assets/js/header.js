// /assets/js/header.js

// --- DEFINICIÓN DE FUNCIONES PRINCIPALES ---

/**
 * Esta función se encarga de actualizar el estado visual del header.
 * Revisa si el usuario ha iniciado sesión y si hay items en el carrito,
 * y muestra u oculta los elementos correspondientes.
 * Se debe ejecutar DESPUÉS de que el HTML del header se haya cargado en la página.
 */
function actualizarEstadoHeader() {
    // 1. CAPTURA DE ELEMENTOS
    // Guardamos en constantes las referencias a todos los elementos del header que vamos a manipular.
    const loginBtn = document.getElementById('loginBtn');           // Botón "Iniciar sesión"
    const userMenu = document.getElementById('userMenu');           // Menú desplegable del usuario
    const userNameSpan = document.getElementById('userName');       // Span para mostrar el nombre del usuario
    const logoutBtn = document.getElementById('logoutBtn');         // Botón "Cerrar sesión"
    const cartCountElement = document.getElementById('cart-count'); // Contador del carrito

    // 2. LÓGICA DE INICIO DE SESIÓN
    // Revisa en localStorage si la variable 'isLoggedIn' está guardada como 'true'.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Comprueba el estado de la sesión.
    if (isLoggedIn) {
        // Si el usuario SÍ ha iniciado sesión:
        if (loginBtn) loginBtn.classList.add('d-none');   // Oculta el botón de "Iniciar sesión".
        if (userMenu) userMenu.classList.remove('d-none'); // Muestra el menú de usuario.
        
        // Obtiene el nombre del usuario desde localStorage.
        const userName = localStorage.getItem('userName');
        // Si el nombre existe, lo muestra en el menú.
        if (userName && userNameSpan) {
            userNameSpan.textContent = userName;
        }
    } else {
        // Si el usuario NO ha iniciado sesión:
        if (loginBtn) loginBtn.classList.remove('d-none'); // Muestra el botón de "Iniciar sesión".
        if (userMenu) userMenu.classList.add('d-none');   // Oculta el menú de usuario.
    }

    // 3. LÓGICA DEL CONTADOR DEL CARRITO
    // Verificamos que el elemento del contador exista en la página.
    if (cartCountElement) {
        // Lee el carrito desde sessionStorage. Si no existe, crea un array vacío.
        const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        // Calcula la cantidad de items obteniendo la longitud del array.
        const cantidadItems = carrito.length;

        // Comprueba si hay productos en el carrito.
        if (cantidadItems > 0) {
            cartCountElement.textContent = cantidadItems;      // Actualiza el número.
            cartCountElement.classList.remove('d-none'); // Muestra el contador.
        } else {
            cartCountElement.classList.add('d-none');      // Oculta el contador.
        }
    }

    // 4. LÓGICA DEL BOTÓN DE CERRAR SESIÓN
    // Si el botón de logout existe, le añade un detector de clics.
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Previene la acción por defecto del enlace.
            // Elimina las variables de sesión del navegador.
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            // Redirige al usuario a la página de inicio.
            window.location.href = '/index.html';
        });
    }
}

/**
 * Esta función se encarga de cargar dinámicamente el HTML del header
 * desde un archivo externo y lo inyecta en la página actual.
 */
function cargarHeader() {
    // Usa 'fetch' para solicitar el contenido del archivo especificado.
    fetch('/componentes/header.html')
        .then(response => {
            // Si la respuesta no es exitosa (ej: error 404), lanza un error.
            if (!response.ok) throw new Error("No se pudo cargar el header.html");
            // Si es exitosa, convierte la respuesta a texto.
            return response.text();
        })
        .then(html => {
            // Busca el contenedor placeholder en la página actual.
            const headerPlaceholder = document.getElementById('header');
            if (headerPlaceholder) {
                // Inyecta el HTML obtenido dentro del placeholder.
                headerPlaceholder.innerHTML = html;
                // Una vez que el HTML está en la página, llama a la función que lo actualiza.
                actualizarEstadoHeader();
            }
        })
        .catch(error => {
            // Si ocurre cualquier error durante el proceso, lo muestra en la consola.
            console.error('Error al cargar el header:', error);
        });
}

// --- EJECUCIÓN INICIAL DEL SCRIPT ---
// Añade un listener al evento 'DOMContentLoaded', que se dispara cuando el HTML base de la página está listo.
// Cuando esto ocurre, se llama a la función 'cargarHeader' para iniciar todo el proceso.
document.addEventListener('DOMContentLoaded', cargarHeader);

// --- FUNCIÓN GLOBAL ---
/**
 * Se define 'actualizarContadorCarrito' de nuevo y se asigna al objeto 'window'.
 * Esto la convierte en una función global, permitiendo que otros scripts
 * (como carrito.js o pagina-carrito.js) puedan llamarla para actualizar el contador
 * sin necesidad de recargar la página.
 */
window.actualizarContadorCarrito = function() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;

    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const cantidadItems = carrito.length;

    if (cantidadItems > 0) {
        cartCountElement.textContent = cantidadItems;
        cartCountElement.classList.remove('d-none');
    } else {
        cartCountElement.classList.add('d-none');
    }
};