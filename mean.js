const Pizza = [
  {id: 1, nombre: "Margarita", precio: 7600, cantidad: 8},
  {id: 2, nombre: "Napolitana", precio: 7900, cantidad: 9},
  {id: 3, nombre: "Pepperoni", precio: 8500, cantidad: 8},
  {id: 4, nombre: "Cuatro Estaciones", precio: 9000, cantidad: 6},
  {id: 5, nombre: "Italiana", precio: 9500, cantidad: 9},
  {id: 6, nombre: "Super Pepperoni", precio: 11000, cantidad: 9},
  {id: 7, nombre: "Vegetariana", precio: 11000, cantidad: 7},
  {id: 8, nombre: "Todas las carnes", precio: 12000, cantidad: 9}
];

const cardContainer = document.getElementById('card-container');

Pizza.forEach(pizza => {
  const { id, nombre, precio, cantidad } = pizza;

  const card = document.createElement('div');
  card.className = 'card';
  card.id = id;

  const image = document.createElement('img');
  image.src = `imagen${id}.jpg`;
  image.alt = `Imagen ${id}`;

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = nombre;

  const price = document.createElement('p');
  price.className = 'card-price';
  price.textContent = `Precio: $${precio}`;

  const quantity = document.createElement('p');
  quantity.className = 'card-quantity';
  quantity.textContent = `Cantidad disponible: ${cantidad}`;

  const addButton = document.createElement('button');
  addButton.className = 'card-button';
  addButton.textContent = 'Agregar al carrito';

  addButton.addEventListener('click', () => {
    miCarrito.agregarProducto(pizza);
    miCarrito.mostrarCarrito();
  });

  cardContent.appendChild(title);
  cardContent.appendChild(price);
  cardContent.appendChild(quantity);
  cardContent.appendChild(addButton);

  card.append(image, cardContent);
  cardContainer.appendChild(card);
});

function carrito() {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];

  function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  function agregarProducto(pizza) {
    const productoExistente = productos.find(item => item.id === pizza.id);
    if (productoExistente) {
      productoExistente.cantidad += pizza.cantidad;
    } else {
      productos.push(pizza);
    }
    guardarProductos();
    console.log(`Producto "${pizza.nombre}" agregado al carrito.`);
  }

  function ajustarCantidadProducto(id, cantidad) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
      producto.cantidad = cantidad;
      guardarProductos();
      console.log(`Cantidad ajustada para el producto "${producto.nombre}".`);
    } else {
      console.log(`El producto con ID ${id} no se encuentra en el carrito.`);
    }
  }

  function eliminarProducto(id) {
    const index = productos.findIndex(item => item.id === id);
    if (index !== -1) {
      const productoEliminado = productos.splice(index, 1)[0];
      guardarProductos();
      console.log(`Producto "${productoEliminado.nombre}" eliminado del carrito.`);
    } else {
      console.log(`El producto con ID ${id} no se encuentra en el carrito.`);
    }
  }

  function mostrarCarrito() {
    const cartCountElement = document.querySelector('.cart-count');
    const productListElement = document.getElementById('product-list');

    cartCountElement.textContent = productos.length.toString();
    productListElement.innerHTML = '';

    if (productos.length === 0) {
      productListElement.textContent = 'El carrito está vacío.';
    } else {
      productos.forEach((pizza, index) => {
        const productElement = document.createElement('div');
        productElement.textContent = `${index + 1}. ID: ${pizza.id}, Nombre: ${pizza.nombre}, Precio: $${pizza.precio}, Cantidad: ${pizza.cantidad}`;
        productListElement.appendChild(productElement);
      });
    }
  }

  function vaciarCarrito() {
    productos.length = 0;
    localStorage.removeItem('productos');
    console.log("El carrito ha sido vaciado.");
  }

  return {
    agregarProducto,
    ajustarCantidadProducto,
    eliminarProducto,
    mostrarCarrito,
    vaciarCarrito
  };
}

const miCarrito = carrito();
const cartIcon = document.createElement('span');
cartIcon.className = 'cart-icon';
cartIcon.innerHTML = '&#128722;';

const cartCount = document.createElement('span');
cartCount.className = 'cart-count';
cartCount.innerHTML = '3';

const container = document.createElement('div');
container.append(cartIcon, cartCount);

const parentElement = document.getElementById('parent-element');
parentElement.appendChild(container);

let respuesta = prompt('¿Desea agregar algo más al carrito? (Ingrese "sí" o "no")').toLowerCase();

while (respuesta !== 'sí' && respuesta !== 'no') {
  respuesta = prompt('¿Desea agregar algo más al carrito? (Ingrese "sí" o "no")').toLowerCase();
}

if (respuesta === 'sí') {
  const id = prompt('Ingrese el id del producto a agregar');
  const pizzaSeleccionada = Pizza.find(pizza => pizza.id === parseInt(id));

  if (pizzaSeleccionada) {
    miCarrito.agregarProducto(pizzaSeleccionada);
    console.log('Producto agregado al carrito.');
  } else {
    console.log('El ID ingresado no corresponde a ninguna pizza.');
  }
}

console.log('Gracias por su preferencia. Finalice la compra.');

function calcularValorEnvio(distancia) {
  const valorBase = 1000;
  const montoPorKilometro = 500;
  const valorEnvio = valorBase + (montoPorKilometro * distancia);
  return valorEnvio;
}

const distancia = parseFloat(prompt('Ingrese la distancia en kilómetros hasta su destino:'));
const valorTotalEnvio = calcularValorEnvio(distancia);
console.log('El valor total del envío es:', valorTotalEnvio);
