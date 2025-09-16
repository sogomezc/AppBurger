

document.addEventListener('DOMContentLoaded', () => {
  // Crear referencias a los elementos del modal
  const modalEl = document.getElementById('productoModal');// creamos una constante con el 
  if (!modalEl) return; // si no existe el HTML del modal, no hacemos nada

  const bsModal = new bootstrap.Modal(modalEl);// se crea constante para controlar el modal de Bootstrap lo hago porque el modal no existe en el HTML inicialmente se crea con JS 
  const modalImg = modalEl.querySelector('.js-modal-img'); // querySelector busca dentro del modal la imagen grande
  const modalTitle = modalEl.querySelector('.js-modal-title');// trae el título
  const modalDesc = modalEl.querySelector('.js-modal-desc');// trae la descripción
  const modalPrice = modalEl.querySelector('.js-modal-price');  //  trae el precio
  const btnAgregar = modalEl.querySelector('.js-modal-add');  // el botón agregar
  const radioSimple = modalEl.querySelector('#optSimple');  // trae el radio button Simple
  const radioDoble = modalEl.querySelector('#optDoble');// trae el radio button Doble


  let productoActual = null;// el producto que se está mostrando
  let precioSimple = 0;// precio si es Simple
  let precioDoble = 0;// precio si es Doble

  // Delegación: cuando hacen click en cualquier imagen de producto, abrimos modal
  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('.product-img');
    if (!img) return;

    // Buscamos el id de producto desde el botón "Agregar" de esa tarjeta
    const card = img.closest('.product-card'); // busca la clase padre que es product-card
    if (!card) return;// si no encuentra la tarjeta, no hacemos nada
    const addBtn = card.querySelector('.agregar-carrito[data-id]');// buscamos el botón dentro de la tarjeta
    if (!addBtn) return;//si no encuentra el botón, no hacemos nada
    const id = parseInt(addBtn.getAttribute('data-id'), 10);// obtenemos el id del atributo data-id

    const prod = (window.productosDB || []).find(p => p.id === id);//// buscamos el producto en la "base de datos"
    if (!prod) return;// si no encuentra el producto, no hacemos nada

    if (prod.categoria !== 'Burgers') {//solo abrimos modal si la categoria es burger
      return;
    }

    // traemos datos del producto de la base de datea
    productoActual = prod; //productoActual es el producto que se está mostrando y prod es el producto que se encontró en la base de datos 
    precioSimple = prod.precio; // Si es simple, el precio es el precio del producto
    precioDoble = prod.precio + 1500; // Si es doble, el precio es 1500 más el precio del Doble

    // se rrellenan los datos del modal con lo que esta en productoActual
    modalImg.src = prod.imagen; //modalImg es la imagen grande y src es la ruta de la imagen
    modalImg.title = prod.nombre; //modalImg es la imagen grande y title es el título de la imagen 
    modalImg.alt = prod.nombre; // modalImg es la imagen grande y alt es el texto alternativo de la imagen este no se ve
    modalTitle.textContent = prod.nombre;  // modalTitle es el título del modal y textContent es el texto que se muestra
    modalDesc.textContent = prod.descripcion;// modalDesc es la descripción del modal y textContent es el texto que se muestra
    radioSimple.checked = true;
    modalPrice.textContent = formatPrice(precioSimple);//
    btnAgregar.textContent = `Agregar ${formatPrice(precioSimple)}`;

    // Abrimos
    bsModal.show(); 
  });

  // Cambia precio al alternar Simple/Doble
  modalEl.addEventListener('change', (e) => {//addEventListener escucha el evento change que ocurre cuando se cambia el valor de un elemento
    if (!productoActual) return;// si no hay producto actual, no hacemos nada
    if (e.target.matches('input[name="sizeBurger"]')) {// si el elemento que se cambió es un input con name sizeBurger
      const isDoble = radioDoble.checked;// si el radioDoble está seleccionado, isDoble es true
      const precioSel = isDoble ? precioDoble : precioSimple;//preciosel es el precio que se va a mostrar en el modal
      modalPrice.textContent = formatPrice(precioSel);
      btnAgregar.textContent = `Agregar ${formatPrice(precioSel)}`;
    }
  });

  // Agregar al carrito desde el modal
  btnAgregar.addEventListener('click', () => {// cuando se hace click en el botón agregar
    if (!productoActual) return;// si no hay producto actual, no hacemos nada
    const isDoble = radioDoble.checked;// si el radioDoble está seleccionado, isDoble es true
    const precioSel = isDoble ? precioDoble : precioSimple;// preciosel es el precio que se va a agregar al carrito
    const variante = isDoble ? 'Doble' : 'Simple';

    // Clonamos el producto y le agregamos precio y varaible
    const item = {
      ...productoActual,// clonamos el producto actual
      precio: precioSel,// le agregamos el precio seleccionado
      variante//: variante // le agregamos la variante seleccionada
    };

    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || []; // si no hay carrito, creamos un array vacío
    carrito.push(item);// agregamos el producto al carrito
    sessionStorage.setItem('carrito', JSON.stringify(carrito)); // guardamos el carrito actualizado

    if (typeof window.actualizarContadorCarrito === 'function') {
      window.actualizarContadorCarrito();// actualiza el contador que esta en el header
    }
    if (typeof window.actualizarBarraCheckout === 'function') {
      window.actualizarBarraCheckout(); // actualiza la barra de checkout que esta en la parte inferior
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