
// =======================================
// Tienda de Frutas - Julian Gabilondo
// =======================================

function init() {
  imprimirDatosAlumno();
  mostrarProductos(frutas);
  mostrarCarrito();
}

// =======================================
// 1. ARRAY DE FRUTAS
// Cada fruta tiene un id, nombre, precio e imagen
// =======================================

const frutas = [
  { id: 1, nombre: "arandano", precio: 5000, imagen: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1000, imagen: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 4000, imagen: "img/frambuesa.png" },
  { id: 4, nombre: "frutilla", precio: 3000, imagen: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2000, imagen: "img/kiwi.jpg" },
  { id: 6, nombre: "mandarina", precio: 800, imagen: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1500, imagen: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 900, imagen: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, imagen: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 3000, imagen: "img/anana.jpg" },
  { id: 11, nombre: "pomelo-amarillo", precio: 2000, imagen: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "pomelo-rojo", precio: 2000, imagen: "img/pomelo-rojo.jpg" },
  { id: 14, nombre: "sandia", precio: 4500, imagen: "img/sandia.jpg" },
];

// =======================================
// 2. DATOS DEL ALUMNO
// Crea un objeto alumno y muestra sus datos en consola y en el nav
// =======================================

function imprimirDatosAlumno() {
  const alumno = { dni: "46958962", nombre: "Julian", apellido: "Gabilondo" };
  console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);
  document.getElementById("nombreAlumno").textContent = `${alumno.nombre} ${alumno.apellido}`;
}

// =======================================
// 3. MOSTRAR PRODUCTOS
// Genera dinámicamente el HTML para cada fruta
// y la agrega dentro del contenedor principal
// =======================================

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";   // Limpia el contenedor antes de volver a mostrar

  // Recorremos todas las frutas y creamos una tarjeta para cada una
  lista.forEach((fruta) => {
    const div = document.createElement("div");
    div.className = "card-producto";
    div.innerHTML = `
      <img src="${fruta.imagen}" alt="${fruta.nombre}">
      <h3>${fruta.nombre}</h3>
      <p>$${fruta.precio}</p>
      <button onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// =======================================
// 4. FILTRAR PRODUCTOS
// Filtra las frutas según el texto escrito en el input de búsqueda
// =======================================

document.getElementById("busqueda").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const resultado = frutas.filter((f) =>
    f.nombre.toLowerCase().includes(texto)
  );
  mostrarProductos(resultado);
});

// =======================================
// 5. CARRITO DE COMPRAS
// Contiene funciones para agregar, eliminar y mostrar los productos del carrito
// =======================================

// Recupera el carrito guardado en localStorage (si existe)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agrega una fruta al carrito según su id
function agregarAlCarrito(id) {
  const producto = frutas.find((f) => f.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

// Elimina un producto del carrito según su posición
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Guarda el carrito en localStorage y actualiza la vista
function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Muestra los productos dentro del carrito
function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = ""; // Limpia la lista
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "bloque-item";
    li.innerHTML = `
      <p class="nombre-item">${item.nombre} - $${item.precio}</p>
      <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  // Actualiza la cantidad de productos y el total
  document.getElementById("total").textContent = `Total: $${total}`;
  document.getElementById("cantidad").textContent = carrito.length;
}

// =======================================
// 6. ORDENAR PRODUCTOS
// =======================================

// Ordenar por nombre (alfabéticamente)
document.getElementById("ordenarNombre").addEventListener("click", () => {
  const ordenado = [...frutas].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );
  mostrarProductos(ordenado);
});

// Ordenar por precio (menor a mayor)
document.getElementById("ordenarPrecio").addEventListener("click", () => {
  const ordenado = [...frutas].sort((a, b) => a.precio - b.precio);
  mostrarProductos(ordenado);
});

// =======================================
// 7. VACIAR CARRITO
// =======================================

// Elimina todos los productos del carrito y actualiza la vista
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

// =======================================
// 8. INICIALIZAR AL CARGAR LA PÁGINA
// Ejecuta la función init cuando se carga la página
// =======================================
window.addEventListener("load", init);