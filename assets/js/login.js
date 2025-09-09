

/* --- CAPTURA DE ELEMENTOS DEL DOM --- */

// Busca el botón con id="register" (el botón "Registro" en el panel de bienvenida).
const registerButton = document.getElementById("register");

// Busca el botón con id="login" (el botón "Iniciar Sesión" en el panel de bienvenida).
const loginButton = document.getElementById("login");

// Busca el contenedor principal que tiene la clase que controla la animación.
const container = document.getElementById("container");

// Busca el input de email (aunque no se usa en este script, está declarado).
const emailInput = document.getElementById("email-login");



/**
 * Añade un detector de eventos al botón de registro.
 * Cuando se hace clic, añade la clase 'right-panel-active' al contenedor.
 * Esta clase, definida en tu CSS, activa la animación que desliza los paneles
 * para mostrar el formulario de registro.
 */
registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

/**
 * Añade un detector de eventos al botón de inicio de sesión.
 * Cuando se hace clic, quita la clase 'right-panel-active' del contenedor.
 * Esto revierte la animación, deslizando los paneles para mostrar
 * el formulario de inicio de sesión.
 */
loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});