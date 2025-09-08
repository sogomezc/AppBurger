// /assets/js/carrito.js
//este archivo se ocupa de manejar la lógica de la página index.html (listado de productos)
// Escucha el evento 'DOMContentLoaded', que se dispara cuando el HTML inicial ha sido completamente cargado y analizado.
// Esto asegura que nuestro script no intente buscar elementos que todavía no existen en la página.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- CAPTURA DE ELEMENTOS DEL DOM ---
    // Guardamos en constantes las referencias a los contenedores HTML donde se mostrarán los productos.
    // Hacemos esto al principio para no tener que buscarlos repetidamente.
    const combosContainer = document.getElementById('combos-container');
    const burgersContainer = document.getElementById('burgers-container');
    const sidesContainer = document.getElementById('sides-container');
    const kidsContainer = document.getElementById('kids-container');
    const drinksContainer = document.getElementById('drinks-container');

    // --- DEFINICIÓN DE FUNCIONES ---

    /**
     * Toma un número (precio) y lo devuelve formateado como moneda chilena (ej: 7990 -> "$7.990").
     * @param {number} price - El precio a formatear.
     * @returns {string} - El precio formateado como texto.
     */
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };
    
    /**
     * Revisa el carrito en sessionStorage, calcula el total y actualiza la barra de pago.
     * La muestra si el total es mayor a cero y la oculta si está vacío.
     */
    function actualizarBarraCheckout() {
        // Obtenemos las referencias a la barra y al elemento donde se muestra el total.
        const checkoutBar = document.getElementById('checkout-bar');
        const totalElement = document.getElementById('total');
        
        // Si alguno de estos elementos no existe en la página, detenemos la función para evitar errores.
        if (!checkoutBar || !totalElement) return;

        // Leemos el carrito desde sessionStorage. Si no existe, creamos un array vacío [].
        const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        
        // Usamos el método 'reduce' para sumar los precios de todos los productos en el carrito.
        const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

        // Comprobamos si hay algo en el carrito.
        if (total > 0) {
            // Si el total es mayor a 0, actualizamos el texto y quitamos la clase 'd-none' para mostrar la barra.
            totalElement.textContent = formatPrice(total);
            checkoutBar.classList.remove('d-none');
        } else {
            // Si el total es 0, añadimos la clase 'd-none' para ocultar la barra.
            checkoutBar.classList.add('d-none');
        }
    }

    /**
     * Lee la base de datos de productos (window.productosDB) y los "dibuja" en la página,
     * colocando cada producto en su contenedor de categoría correspondiente.
     */
    function renderizarProductos() {
        // Verificamos que todos los contenedores existan antes de intentar usarlos.
        if (!combosContainer || !burgersContainer || !sidesContainer || !kidsContainer || !drinksContainer) {
            console.error("No se encontraron todos los contenedores de productos.");
            return; // Detenemos la función si falta alguno.
        }

        // Recorremos cada producto de nuestra base de datos.
        window.productosDB.forEach(producto => {
            // Creamos el bloque HTML para la tarjeta de un producto usando plantillas de texto (template literals).
            // Esto nos permite insertar variables como ${producto.nombre} directamente en el HTML.
            const productoHTML = `
                <div class="col-12 col-md-6 col-xl-4">
                  <article class="product-card">
                    <img src="${producto.imagen}" class="product-img" alt="${producto.nombre}">
                    <div class="product-panel">
                      <h5 class="mb-1">${producto.nombre}</h5>
                      <p class="text-muted small mb-2">${producto.descripcion}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="price">${formatPrice(producto.precio)} <span class="price-unit">c/u</span></span>
                        <button class="btn btn-panel agregar-carrito" data-id="${producto.id}">Agregar</button>
                      </div>
                    </div>
                  </article>
                </div>
            `;

            // Usamos una estructura 'switch' para decidir en qué contenedor se debe insertar el HTML del producto.
            switch (producto.categoria) {
                case 'Combos': combosContainer.innerHTML += productoHTML; break;
                case 'Burgers': burgersContainer.innerHTML += productoHTML; break;
                case 'Acompañamientos': sidesContainer.innerHTML += productoHTML; break;
                case 'Kids': kidsContainer.innerHTML += productoHTML; break;
                case 'Refrescos': drinksContainer.innerHTML += productoHTML; break;
            }
        });
    }

    /**
     * Maneja el evento de clic para agregar un producto al carrito.
     * @param {Event} e - El objeto del evento de clic.
     */
    function agregarAlCarrito(e) {
        // Usamos delegación de eventos: verificamos si el elemento clickeado tiene la clase 'agregar-carrito'.
        if (e.target.classList.contains('agregar-carrito')) {
            // Obtenemos el ID del producto desde el atributo 'data-id' del botón.
            const productoId = parseInt(e.target.getAttribute('data-id'));
            // Buscamos el objeto completo del producto en nuestra base de datos.
            const productoAgregado = window.productosDB.find(p => p.id === productoId);
            
            // Si por alguna razón no se encuentra el producto, detenemos la función.
            if (!productoAgregado) return;

            // Leemos el carrito actual desde sessionStorage.
            let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
            // Agregamos el nuevo producto al array del carrito.
            carrito.push(productoAgregado);
            // Guardamos el carrito actualizado de vuelta en sessionStorage.
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            
            // Actualizamos los elementos visuales que dependen del carrito.
            if (typeof window.actualizarContadorCarrito === 'function') {
                window.actualizarContadorCarrito(); // Actualiza el contador del header.
            }
            actualizarBarraCheckout(); // Actualiza la barra de total en la parte inferior.

            // Damos una confirmación visual al usuario.
            console.log(`Producto agregado: ${productoAgregado.nombre}`);
            alert(`"${productoAgregado.nombre}" se ha agregado a tu carrito.`);
        }
    }

    // --- EJECUCIÓN INICIAL DEL SCRIPT ---
    
    // 1. Dibuja todos los productos en la página tan pronto como se carga.
    renderizarProductos(); 
    
    // 2. Revisa el carrito al cargar la página por si ya habían productos de otra página de la misma sesión.
    actualizarBarraCheckout();
    
    // 3. Añade un único listener de eventos al contenedor <main>.
    // Esto es más eficiente que añadir un listener a cada botón individualmente (delegación de eventos).
    document.querySelector('main').addEventListener('click', agregarAlCarrito);
});