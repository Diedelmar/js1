function saludar(nombreCliente) {
  console.log(`¡Hola ${nombreCliente}! Bienvenido/a a Super Pizza.`);
}
const nombreCliente = prompt('Por favor, ingrese su nombre:');
saludar(nombreCliente);



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

Pizza.forEach(pizza => {
  console.log(`ID: ${pizza.id}, Nombre: ${pizza.nombre}, Precio: $${pizza.precio}, Cantidad: ${pizza.cantidad}`);
});

function carrito() {
  const productos = [];

  function agregarProducto(pizza) {
    const productoExistente = productos.find(item => item.id === pizza.id);
    if (productoExistente) {
      productoExistente.cantidad += pizza.cantidad;
    } else {
      productos.push(pizza);
    }
    console.log(`Producto "${pizza.nombre}" agregado al carrito.`);
  }

  function ajustarCantidadProducto(id, cantidad) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
      producto.cantidad = cantidad;
      console.log(`Cantidad ajustada para el producto "${producto.nombre}".`);
    } else {
      console.log(`El producto con ID ${id} no se encuentra en el carrito.`);
    }
  }

  function eliminarProducto(id) {
    const index = productos.findIndex(item => item.id === id);
    if (index !== -1) {
      const productoEliminado = productos.splice(index, 1)[0];
      console.log(`Producto "${productoEliminado.nombre}" eliminado del carrito.`);
    } else {
      console.log(`El producto con ID ${id} no se encuentra en el carrito.`);
    }
  }

  function mostrarCarrito() {
    console.log("Productos en el carrito:");
    if (productos.length === 0) {
      console.log("El carrito está vacío.");
    } else {
      let total = 0;
      productos.forEach((pizza, index) => {
        const subtotal = pizza.precio * pizza.cantidad;
        total += subtotal;
        console.log(`${index + 1}. ID: ${pizza.id}, Nombre: ${pizza.nombre}, Precio: $${pizza.precio}, Cantidad: ${pizza.cantidad}, Subtotal: $${subtotal}`);
      });
      console.log(`Total de la compra: $${total}`);
    }
  }

  function vaciarCarrito() {
    productos.length = 0;
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


miCarrito.agregarProducto({ id: 1, nombre: 'Pizza Margarita', precio: 7600, cantidad: 2 });
miCarrito.agregarProducto({ id: 2, nombre: 'Pizza Napolitana', precio: 7900, cantidad: 1 });
miCarrito.agregarProducto({ id: 3, nombre: 'Pizza Pepperoni', precio: 8500, cantidad: 3 });


miCarrito.mostrarCarrito();


miCarrito.ajustarCantidadProducto(2, 3);


miCarrito.eliminarProducto(2);


miCarrito.mostrarCarrito();


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
} else {
  console.log('Gracias por su preferencia. Finalice la compra.');
}





function calcularValorEnvio(distancia) {
  const valorBase = 1000;
  const montoPorKilometro = 500;
  const valorEnvio = valorBase + (montoPorKilometro * distancia);
  return valorEnvio;
}

const distancia = parseFloat(prompt('Ingrese la distancia en kilómetros hasta su destino:'));
const valorTotalEnvio = calcularValorEnvio(distancia);
console.log('El valor total del envío es:', valorTotalEnvio);
