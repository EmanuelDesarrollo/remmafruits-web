mostrarBadge();

function agregarProducto(nombre_producto, event) {
  const listaStorage = localStorage.getItem('listaProductos');
  let listaProductos = [];
  if (listaStorage) {
    listaProductos = JSON.parse(listaStorage);
  }

  listaProductos.push(nombre_producto);
  localStorage.setItem('listaProductos', JSON.stringify(listaProductos));

  // Mostrar el elemento "check" al eliminar la clase "hide"
  const checkElement = event.target.querySelector('.check');
  checkElement.classList.remove('hide');

  // Configurar un temporizador para ocultar "check" después de 1 segundo
  setTimeout(function () {
    checkElement.classList.add('hide');
  }, 500);

  mostrarBadge();
}

function eliminarProducto(nombre_producto) {
  const listaStorage = localStorage.getItem('listaProductos');
  let listaProductos = [];
  if (listaStorage) {
    listaProductos = JSON.parse(listaStorage);
  }

  const index = listaProductos.indexOf(nombre_producto);
  if (index > -1) {
    listaProductos.splice(index, 1);
  }
  localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
  mostrarBadge();
  fillOrderList();
}

function mostrarBadge() {
  const listaStorage = localStorage.getItem('listaProductos');
  let listaProductos = [];
  if (listaStorage) {
    listaProductos = JSON.parse(listaStorage);
    const badge = document.getElementById('badge-card-products');
    badge.innerHTML = listaProductos.length;
    badge.classList.remove('hide');
  } else {
    const badge = document.getElementById('badge-card-products');
    badge.classList.add('hide');
  }
}

function showAside() {
  const aside = document.getElementById('aside');
  const body = document.getElementById('body');
  const btnOrder = document.getElementById('order-action');
  body.style.overflow = 'hidden';
  fillOrderList();

  const listaStorage = localStorage.getItem('listaProductos');
  let listaProductos = [];
  if (listaStorage) {
    listaProductos = JSON.parse(listaStorage);
  } else {
    //   console.log("Si hay productos en el carrito", listaProductos);
    //   if (listaProductos.length === 0) {
    //     btnOrder.setAttribute('disabled', true);
    //   } else {
    //     btnOrder.setAttribute('disabled', false);
    //   }
    //   btnOrder.setAttribute('disabled', true);
  }
  aside.classList.remove('hide');
}

function hideAside() {
  const aside = document.getElementById('aside');
  const body = document.getElementById('body');
  const successContainer = document.getElementById('order-success');
  const btnCancel = document.getElementById('order-cancel');
  const listProductos = document.getElementById('order-list');
  const btnBuy = document.getElementById('order-action');

  body.style.overflow = 'auto';
  aside.classList.add('hide');

  successContainer.classList.add('hide');
  btnCancel.classList.add('hide');
  listProductos.classList.remove('hide');
  btnBuy.classList.remove('hide');
}

function fillOrderList() {
  const listaStorage = localStorage.getItem('listaProductos');
  let listaProductos = [];
  if (listaStorage) {
    listaProductos = JSON.parse(listaStorage);
    const lista = document.getElementById('order-list');
    lista.innerHTML = '';

    listaProductos.forEach(producto => {
      lista.innerHTML += `<div class="order">
          <p>${producto}</p>
          <a href="#" onclick="eliminarProducto('${producto}')">
              <i class="fa-solid fa-trash-can"></i>
          </a>
        </div>`;
    });
  } else {
    const lista = document.getElementById('order-list');
    lista.innerHTML = `<div class="order">
          <p>No hay productos en el carrito</p>
        </div>`;
  }
}


function buyOrder() {
  localStorage.clear();

  const listProductos = document.getElementById('order-list');
  const btnBuy = document.getElementById('order-action');
  listProductos.classList.add('hide');
  btnBuy.classList.add('hide');
  const successContainer = document.getElementById('order-success');
  const btnCancel = document.getElementById('order-cancel');
  successContainer.classList.remove('hide');
  btnCancel.classList.remove('hide');

  mostrarBadge();
  fillOrderList();

}
