// /assets/js/pagina-carrito.js

// este archivo se ocupa de manejar la lógica de la página carrito.html

// Escucha el evento 'DOMContentLoaded', que se dispara cuando el HTML inicial de la página está listo.
// Esto asegura que el script no intente buscar elementos que todavía no existen.
document.addEventListener('DOMContentLoaded', () => {

    // --- CAPTURA DE ELEMENTOS DEL DOM ---
    // Guardamos en constantes las referencias a los elementos HTML que vamos a manipular.
    const cartItemsContainer = document.getElementById('cart-items-container'); // Contenedor para la lista de productos.
    const emptyCartMessage = document.getElementById('empty-cart-message');   // Mensaje que se muestra si el carrito está vacío.
    const cartSummary = document.getElementById('cart-summary');                 // Tarjeta con el resumen del pedido.
    const cartTotalElement = document.getElementById('cart-total');              // Elemento para mostrar el precio total.
    const cartSubtotalElement = document.getElementById('cart-subtotal');        // Elemento para mostrar el subtotal.

    // Si los elementos principales no existen en la página, detenemos el script para evitar errores.
    if (!cartItemsContainer || !emptyCartMessage || !cartSummary) {
        return; 
    }

    // --- DEFINICIÓN DE FUNCIONES ---

    /**
     * Toma un número (precio) y lo devuelve formateado como moneda chilena (ej: 7990 -> "$7.990").
     */
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    };

    /**
     * Dibuja todo el contenido del carrito en la página.
     * Lee los datos de sessionStorage, agrupa los productos, calcula totales y genera el HTML.
     */
    function renderizarCarrito() {
        // Lee el carrito desde sessionStorage. Si no existe, crea un array vacío.
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        // Limpia el contenedor de items para evitar duplicados al volver a dibujar.
        cartItemsContainer.innerHTML = ''; 

        // Comprueba si el carrito está vacío.
        if (carrito.length === 0) {
            // Muestra el mensaje de "carrito vacío" y oculta la lista de items y el resumen del pedido.
            emptyCartMessage.classList.remove('d-none');
            cartSummary.parentElement.classList.add('d-none');
            cartItemsContainer.classList.add('d-none');
        } else {
            // Oculta el mensaje de "carrito vacío" y muestra la lista y el resumen.
            emptyCartMessage.classList.add('d-none');
            cartSummary.parentElement.classList.remove('d-none');
            cartItemsContainer.classList.remove('d-none');
            
            // Agrupa productos idénticos para poder mostrar su cantidad (ej: Clásica x2).
            const carritoAgrupado = carrito.reduce((acc, producto) => {
                if (!acc[producto.id]) { // Si el producto aún no está en el acumulador...
                    acc[producto.id] = { ...producto, cantidad: 0 }; // ...lo inicializa.
                }
                acc[producto.id].cantidad++; // Incrementa su cantidad.
                return acc;
            }, {});

            // Calcula el precio total sumando los precios de todos los items.
            const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
            cartSubtotalElement.textContent = formatPrice(total);
            cartTotalElement.textContent = formatPrice(total);

            // "Dibuja" cada producto agrupado en la página.
            Object.values(carritoAgrupado).forEach(producto => {
                // Crea el bloque HTML para la tarjeta del producto.
                const itemHTML = `
                    <div class="card bg-dark border-secondary mb-3">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-6 d-flex align-items-center">
                                    <img src="${producto.imagen}" alt="${producto.nombre}" class="rounded" style="width: 80px; height: 80px; object-fit: cover;">
                                    <div class="ms-3">
                                        <h5 class="mb-1 text-white">${producto.nombre}</h5>
                                        <p class="text-white mb-0">${formatPrice(producto.precio)} c/u</p>
                                    </div>
                                </div>
                                <div class="col-md-2 text-center">
                                    <h5 class="mb-0 text-white">${formatPrice(producto.precio * producto.cantidad)}</h5>
                                </div>
                                <div class="col-md-4 d-flex justify-content-end align-items-center gap-3">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-outline-secondary btn-sm restar-uno" data-id="${producto.id}">-</button>
                                        <h5 class="mb-0 mx-3 text-white">${producto.cantidad}</h5>
                                        <button class="btn btn-outline-secondary btn-sm sumar-uno" data-id="${producto.id}">+</button>
                                    </div>
                                    <button class="btn btn-outline-danger btn-sm remover-grupo" data-id="${producto.id}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                // Añade la tarjeta del producto al contenedor principal.
                cartItemsContainer.innerHTML += itemHTML;
            });
        }
    }

    /**
     * Maneja los clics para sumar (+), restar (-) o eliminar (tacho) productos del carrito.
     * @param {Event} e - El objeto del evento de clic.
     */
    function modificarCantidad(e) {
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        const target = e.target;
        
        // Identifica qué botón fue presionado de manera fiable con .closest().
        const botonSumar = target.closest('.sumar-uno');
        const botonRestar = target.closest('.restar-uno');
        const botonRemover = target.closest('.remover-grupo');

        if (botonSumar) {
            const productoId = parseInt(botonSumar.getAttribute('data-id'));
            const productoAAgregar = window.productosDB.find(p => p.id === productoId);
            if (productoAAgregar) {
                carrito.push(productoAAgregar); // Añade una nueva instancia del producto al carrito.
            }
        }

        if (botonRestar) {
            const productoId = parseInt(botonRestar.getAttribute('data-id'));
            const productoIndex = carrito.findIndex(p => p.id === productoId);
            if (productoIndex > -1) { // Si se encuentra el producto...
                carrito.splice(productoIndex, 1); // ...se elimina una sola instancia de él.
            }
        }

        if (botonRemover) {
            const productoId = parseInt(botonRemover.getAttribute('data-id'));
            // Filtra el carrito, quedándose solo con los productos que NO coincidan con el ID a eliminar.
            carrito = carrito.filter(producto => producto.id !== productoId);
        }

        // Si se realizó alguna de las acciones anteriores, actualiza la información.
        if (botonSumar || botonRestar || botonRemover) {
            sessionStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito modificado.
            renderizarCarrito(); // Vuelve a dibujar el carrito para reflejar los cambios.
            
            // Llama a la función global para actualizar el contador en el header.
            if (typeof window.actualizarContadorCarrito === 'function') {
                window.actualizarContadorCarrito();
            }
        }
    }

    // --- EJECUCIÓN INICIAL ---
    
    // 1. Dibuja el estado inicial del carrito cuando la página se carga.
    renderizarCarrito();
    
    // 2. Añade un único listener de eventos al contenedor principal de items.
    // Esto es más eficiente que añadir un listener a cada botón individualmente.
    cartItemsContainer.addEventListener('click', modificarCantidad);
});