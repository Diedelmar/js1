const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10, cantidad: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20, cantidad: 5 },
  { id: 3, nombre: 'Producto 3', precio: 30, cantidad: 8 }
];

let carrito = [];
let envioCosto = 2500;

function mostrarProductos() {
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  productosDiv.innerHTML = productos.map(producto => `
    <div class="card">
      <img src="producto${producto.id}.jpg" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    </div>
  `).join('');
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);

  const itemEnCarrito = carrito.find(item => item.producto.id === idProducto);

  if (producto.cantidad > 0) {
    if (itemEnCarrito) {
      itemEnCarrito.cantidad++;
    } else {
      carrito.push({ producto, cantidad: 1 });
    }

    producto.cantidad--;

    if (producto.cantidad === 1) {
      alert('¡Última existencia del producto!');
    }

    mostrarCarrito();
  } else {
    alert('Producto agotado');
  }
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(item => {
    const carritoItem = document.createElement('li');
    carritoItem.innerHTML = `${item.producto.nombre} - Cantidad: ${item.cantidad} - Precio: $${(item.producto.precio * item.cantidad).toFixed(2)}`;

    listaCarrito.appendChild(carritoItem);
  });

  actualizarTotal();
}

function quitarDelCarrito(idProducto) {
  carrito = carrito.filter(producto => producto.id !== idProducto);

  mostrarCarrito();
}

function actualizarTotal() {
  const total = document.getElementById('total');
  let precioTotal = carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);

  if (document.getElementById('shipping-checkbox').checked) {
    precioTotal += envioCosto;
  }

  total.innerText = precioTotal.toFixed(2);
}

document.getElementById('btn-comprar').addEventListener('click', function() {
  carrito = [];
  mostrarCarrito();
  alert('Gracias por tu compra');
});

mostrarProductos();
