
// /assets/js/producto-modal.js
// imagen grande + descripción + elegir Simple/Doble (Solo en Burgers))

document.addEventListener('DOMContentLoaded', () => {
  // Crear referencias a los elementos del modal
  const modalEl = document.getElementById('productoModal');
  if (!modalEl) return; // si no existe el HTML del modal, no hacemos nada

  const bsModal = new bootstrap.Modal(modalEl);// instancia de Bootstrap Modal
  const modalImg = modalEl.querySelector('.js-modal-img'); 
  const modalTitle = modalEl.querySelector('.js-modal-title');
  const modalDesc = modalEl.querySelector('.js-modal-desc');
  const modalPrice = modalEl.querySelector('.js-modal-price');
  const btnAgregar = modalEl.querySelector('.js-modal-add');
  const radioSimple = modalEl.querySelector('#optSimple');
  const radioDoble = modalEl.querySelector('#optDoble');


  let productoActual = null;// el producto que se está mostrando
  let precioSimple = 0;// precio si es Simple
  let precioDoble = 0;// precio si es Doble

  // Delegación: cuando hacen click en cualquier imagen de producto, abrimos modal
  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('.product-img');
    if (!img) return;

    // Buscamos el id de producto desde el botón "Agregar" de esa tarjeta
    const card = img.closest('.product-card');
    if (!card) return;
    const addBtn = card.querySelector('.agregar-carrito[data-id]');
    if (!addBtn) return;
    const id = parseInt(addBtn.getAttribute('data-id'), 10);

    const prod = (window.productosDB || []).find(p => p.id === id);
    if (!prod) return;

    if (prod.categoria !== 'Burgers') {//solo abrimos modal si la categoria es burger
      return;
    }

    // traemos datos del producto de la "base de datos"
    productoActual = prod;
    precioSimple = prod.precio;
    precioDoble = prod.precio + 1500; // Si es doble, el precio es 1500 más el precio del Doble

    // se rrellenan los datos del modal con lo que esta en productoActual
    modalImg.src = prod.imagen; // imagen grande
    modalImg.title = prod.nombre; // titulodel producto
    modalImg.alt = prod.nombre; // alt de la imagen
    modalTitle.textContent = prod.nombre;       
    modalDesc.textContent = prod.descripcion;
    radioSimple.checked = true;
    modalPrice.textContent = formatPrice(precioSimple);
    btnAgregar.textContent = `Agregar ${formatPrice(precioSimple)}`;

    // Abrimos
    bsModal.show(); 
  });

  // Cambia precio al alternar Simple/Doble
  modalEl.addEventListener('change', (e) => {
    if (!productoActual) return;
    if (e.target.matches('input[name="sizeBurger"]')) {
      const isDoble = radioDoble.checked;
      const precioSel = isDoble ? precioDoble : precioSimple;
      modalPrice.textContent = formatPrice(precioSel);
      btnAgregar.textContent = `Agregar ${formatPrice(precioSel)}`;
    }
  });

  // Agregar al carrito desde el modal
  btnAgregar.addEventListener('click', () => {
    if (!productoActual) return;
    const isDoble = radioDoble.checked;
    const precioSel = isDoble ? precioDoble : precioSimple;
    const variante = isDoble ? 'Doble' : 'Simple';

    // Clonamos el producto y le agregamos precio y varaible
    const item = {
      ...productoActual,
      precio: precioSel,
      variante
    };

    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || []; // si no hay carrito, creamos un array vacío
    carrito.push(item);// agregamos el producto al carrito
    sessionStorage.setItem('carrito', JSON.stringify(carrito)); // guardamos el carrito actualizado

    if (typeof window.actualizarContadorCarrito === 'function') {
      window.actualizarContadorCarrito();
    }
    if (typeof window.actualizarBarraCheckout === 'function') {
      window.actualizarBarraCheckout();
    }

    // Cierre del modal y mensaje
    bsModal.hide();
    alert(`"${productoActual.nombre}" (${variante}) se agregó a tu carrito.`);
  });

  // Formateador usado en carrito.js (lo definimos aquí si no existe)
  function formatPrice(num) {// formatea número a moneda CLP
    try {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(num);
    } catch {
      return `$${(num||0).toLocaleString('es-CL')}`;//
    }
  }
});