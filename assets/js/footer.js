

// Escucha el evento 'DOMContentLoaded', que se dispara cuando el HTML inicial de la página está listo.
// Esto asegura que nuestro script no intente buscar un elemento que todavía no existe.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Busca en el documento el elemento con el id 'site-footer'.
    // Este es el contenedor vacío en tus páginas que servirá como placeholder.
    const footerPlaceholder = document.getElementById('site-footer');

    // 2. Si la página actual no tiene un contenedor para el footer, detenemos el script.
    // Esto es una buena práctica para evitar errores en páginas que no necesiten un footer dinámico.
    if (!footerPlaceholder) {
        return;
    }

    // 3. Usamos  'fetch' para solicitar el contenido del archivo footer.html.
    // La ruta '/componentes/footer.html' es relativa a la raíz de tu sitio web.
    fetch('/componentes/footer.html')
        .then(response => {
            // 4. Verificamos si la solicitud fue exitosa.
            if (!response.ok) {
                // Si hay un error (ej: archivo no encontrado 404), lanzamos un error para pasar al bloque .catch().
                throw new Error("No se pudo cargar el footer. Revisa la ruta.");
            }
            // 5. Si la respuesta es exitosa, la convertimos a formato de texto.
            return response.text();
        })
        .then(html => {
            // 6. Tomamos el texto HTML obtenido y lo inyectamos dentro de nuestro contenedor.
            // Esto efectivamente "dibuja" el footer en la página.
            footerPlaceholder.innerHTML = html;
        })
        .catch(error => {
            // 7. Si en cualquier punto del 'fetch' ocurre un error, se captura aquí.
            console.error(error); // Muestra el error detallado en la consola para depuración.
            // Mostramos un mensaje simple en la página para que el usuario sepa que algo falló.
            footerPlaceholder.innerText = "Error al cargar el footer.";
        });
});