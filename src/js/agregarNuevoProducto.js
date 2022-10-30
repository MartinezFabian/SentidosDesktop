import { database } from './conexionBD.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import ProductoRegistradoService from './productosRegistrados.js';

const inputNombreProductoNuevo = document.getElementById('nombre-consumicion');
const inputDescripcionProductoNuevo = document.getElementById('descripcion-consumicion');
const inputPrecioProductoNuevo = document.getElementById('precio-consumicion');
const inputCategoriaProductoNuevo = document.getElementById('categoria-consumicion');

const mensajeExito = document.getElementById('mensaje_exito');

const botonAgregarProductoNuevo = document.getElementById('boton-agregar-consumicion');

botonAgregarProductoNuevo.addEventListener('click', (evento) => {
    evento.preventDefault();
    deshabilitarTodosLosBotones();

    const nuevoProducto = new ProductoRegistradoService;

    nuevoProducto.getCantidadProductosRegistrados()
        .then( cantidad => {

            const actualizarProductosRegistradosRef = ref(database, 'menu/cantidadProductos');
            set(actualizarProductosRegistradosRef, cantidad + 1);

            const newProductoRef = ref(database, `menu/producto${cantidad + 1}`);

            const nuevoProducto = {
                id: cantidad + 1,
                categoria: inputCategoriaProductoNuevo.value,
                nombre: inputNombreProductoNuevo.value,
                ingredientes: inputDescripcionProductoNuevo.value,
                precio: inputPrecioProductoNuevo.value
            };

            mensajeExito.innerText = "Producto agregado exitosamente";
            mensajeExito.style.color = 'red';

            console.log(nuevoProducto);
            
            set(newProductoRef, nuevoProducto);
            setTimeout(() => {location.reload();}, 3000);

        })
        .catch(error => console.log(error));
});

function deshabilitarTodosLosBotones() {
    let botones = document.querySelectorAll('button');
    botones.forEach(boton => {
        boton.disabled = true;
    })
}