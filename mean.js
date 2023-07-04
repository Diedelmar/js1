//conts. productos

const productos = [
  { id: 1, name: 'Cama King Size', precio: 250000, cantidad: 50, description: 'Cama matrimonial de gran tamaño' },
  { id: 2, name: 'Cama 2 plazas', precio: 250000, cantidad: 35, description: 'Cama doble de tamaño standard' },
  { id: 3, name: 'Cama 1 plaza', precio: 200000, cantidad: 48, description: 'Cama individual con colchón incluido' },
  { id: 4, name: 'Escritorio', precio: 80000, cantidad: 40, description: 'Rustico Madera' },
  { id: 5, name: 'Sillon 2 cuerpos', precio: 250000, cantidad: 30, description: 'Tapizado Eco cuero' },
  { id: 6, name: 'Sillon vintage', precio: 400000, cantidad: 15, description: 'Diseño exclusivo' }
];

//buscador

function search() {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results');
  const searchText = searchInput.value.trim().toLowerCase();

  resultsContainer.innerHTML = '';

  const matchingProducts = productos.filter(producto =>
    producto.name.toLowerCase().includes(searchText)
  );

  if (matchingProducts.length > 0) {
    matchingProducts.forEach(producto => {
      const resultItem = document.createElement('p');
      resultItem.textContent = `Producto: ${producto.name}, Stock: ${producto.cantidad}`;
      resultsContainer.appendChild(resultItem);
    });
  } else {
    const noResults = document.createElement('p');
    noResults.textContent = 'No se encontraron productos.';
    resultsContainer.appendChild(noResults);
  }
}
// carrito

let carrito = [];
const envioCosto = 5000; // Costo del envío


function agregarAlCarrito(idProducto) {
  const producto = productos.find(product => product.id === idProducto);

  if (!producto || producto.cantidad === 0) {
    mostrarMensaje('Producto agotado');
    return;
  }

  const itemEnCarrito = carrito.find(item => item.producto.id === idProducto);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ producto, cantidad: 1 });
  }

  producto.cantidad--;

  if (producto.cantidad === 1) {
    mostrarMensaje('¡Última existencia del producto!');
  }

  guardarCarritoEnAlmacenamientoLocal();
  mostrarCarrito();
}

function quitarDelCarrito(idProducto) {
  const itemEnCarrito = carrito.find(item => item.producto.id === idProducto);

  if (!itemEnCarrito) {
    return;
  }

  itemEnCarrito.cantidad--;

  if (itemEnCarrito.cantidad === 0) {
    carrito = carrito.filter(item => item.producto.id !== idProducto);
  }

  const producto = productos.find(product => product.id === idProducto);
  producto.cantidad++;

  guardarCarritoEnAlmacenamientoLocal();
  mostrarCarrito();
}

function guardarCarritoEnAlmacenamientoLocal() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeAlmacenamientoLocal() {
  const carritoGuardado = localStorage.getItem('carrito');

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}
function actualizarTotal() {
  const totalElement = document.getElementById('total');
  let precioTotal = carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);

  if (document.getElementById('shipping-checkbox').checked) {
    precioTotal += envioCosto;
  }

  totalElement.textContent = precioTotal.toFixed(2);
}
function mostrarMensaje(mensaje) {
  const mensajeElement = document.getElementById('mensaje');
  mensajeElement.textContent = mensaje;
  mensajeElement.style.display = 'block';
}

function comprar() {
  carrito = []; 
  guardarCarritoEnAlmacenamientoLocal(); 
  mostrarCarrito(); 
  mostrarMensaje('¡Gracias por preferirnos!'); 
}

const btnComprar = document.getElementById('btn-comprar');
btnComprar.addEventListener('click', comprar);

function mostrarProductos() {
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  productos.forEach(producto => {
    const productElement = document.createElement('div');
    productElement.classList.add('card');
    productElement.innerHTML = `
      <img src="producto${producto.id}.jpg" alt="${producto.name}">
      <h3>${producto.name}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

    productosDiv.appendChild(productElement);
  });
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(item => {
    const carritoItem = document.createElement('li');
    carritoItem.innerHTML = `${item.producto.name} - Cantidad: ${item.cantidad} - Precio: $${(item.producto.precio * item.cantidad).toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Quitar del carrito';
    removeButton.addEventListener('click', () => {
      quitarDelCarrito(item.producto.id);
    });

    carritoItem.appendChild(removeButton);
    listaCarrito.appendChild(carritoItem);
  });

  actualizarTotal();
}

cargarCarritoDesdeAlmacenamientoLocal();
mostrarProductos();
mostrarCarrito();