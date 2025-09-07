document.addEventListener('DOMContentLoaded', () => {
    // Definimos el elemento donde se cargará el footer.
    const footerPlaceholder = document.getElementById('site-footer');

    // Si la página actual no tiene un contenedor para el footer, no hacemos nada.
    if (!footerPlaceholder) {
        return;
    }

    // Usamos fetch para traer el contenido del archivo footer.html.
    fetch('/componentes/footer.html')
        .then(response => {
            // Verificamos si la respuesta es exitosa.
            if (!response.ok) {
                throw new Error("No se pudo cargar el footer. Revisa la ruta.");
            }
            return response.text();
        })
        .then(html => {
            // Inyectamos el HTML del footer en el contenedor.
            footerPlaceholder.innerHTML = html;
        })
        .catch(error => {
            console.error(error);
            // Mostramos un mensaje de error en el lugar del footer si algo falla.
            footerPlaceholder.innerText = "Error al cargar el footer.";
        });
});