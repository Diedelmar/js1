const productos = [
  { id: 1, name: 'Cama King Size', precio: 250000, cantidad: 50 },
  { id: 2, name: 'Cama 2 plazas', precio: 250000, cantidad: 35 },
  { id: 3, name: 'Cama 1 plaza', precio: 200000, cantidad: 48 }
];

let carrito = [];

const envioCosto = 5000; // Costo del envío

document.getElementById('btn-buscar').addEventListener('click', function() {
  const searchTerm = document.getElementById("searchInput").value;
  searchInProducts(searchTerm);
});

function searchInProducts(searchTerm) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const filteredProducts = productos.filter(function(product) {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (filteredProducts.length > 0) {
    filteredProducts.forEach(function(product) {
      const productElement = document.createElement("div");
      productElement.innerHTML = `<h3>${product.name}</h3><p>Precio: $${product.precio.toFixed(2)}</p>`;
      const addButton = document.createElement("button");
      addButton.textContent = "Agregar al carrito";
      addButton.addEventListener("click", function() {
        agregarAlCarrito(product.id);
      });
      productElement.appendChild(addButton);
      resultsContainer.appendChild(productElement);
    });
  } else {
    resultsContainer.innerHTML = "No se encontraron resultados";
  }
}

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

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);

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

  const producto = productos.find(p => p.id === idProducto);
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

document.getElementById('btn-comprar').addEventListener('click', () => {
  carrito = [];
  guardarCarritoEnAlmacenamientoLocal();
  mostrarCarrito();
  mostrarMensaje('¡Gracias por tu compra!');
});

function mostrarMensaje(mensaje) {
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerText = mensaje;
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