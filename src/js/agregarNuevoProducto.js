import { database } from './conexionBD.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import ProductoRegistradoService from './productosRegistrados.js';

const inputNombreProductoNuevo = document.getElementById('nombre-consumicion');
const inputDescripcionProductoNuevo = document.getElementById('descripcion-consumicion');
const inputPrecioProductoNuevo = document.getElementById('precio-consumicion');
const inputCategoriaProductoNuevo = document.getElementById('categoria-consumicion');

const labelNombreProductoNuevo = document.getElementById('legend_nombre_consumicion');
const labelDescripcionProductoNuevo = document.getElementById('legend_descripcion_consumicion');
const labelPrecioProductoNuevo = document.getElementById('legend_precio_consumicion');

const listaMensajes = document.querySelectorAll('.label_mensaje_error');

const mensajeExito = document.getElementById('mensaje_exito');

const botonAgregarProductoNuevo = document.getElementById('boton-agregar-consumicion');

function validarNombreProducto(comprobarNombreProducto) {
    const nombreValido = /[a-zñ]{3,20}/i;
    if(nombreValido.test(comprobarNombreProducto)) {
        console.log('nombre válido');
        console.log(inputNombreProductoNuevo.value);
        nombreProductoNuevoCorrecto = true;
    } else {
        console.log('nombre inválido');
        console.log(inputNombreProductoNuevo.value);
        labelNombreProductoNuevo.innerText = 'El nombre debe contener solo letras' 
        + ' y tener entre 3 y 20 caracteres';
        labelNombreProductoNuevo.style.color = 'red';
    }
}

function validarDescripcionProductoNuevo(comprobarDescripcionNuevoProducto) {
    const descripcionValido = /[a-zñ]{3,50}/i;
    if(descripcionValido.test(comprobarDescripcionNuevoProducto)) {
        console.log('descripcion válida');
        console.log(inputDescripcionProductoNuevo.value);
        desripcionProductoNuevoCorrecto = true;
    } else {
        console.log('descripcion inválido');
        console.log(inputDescripcionProductoNuevo.value);
        labelDescripcionProductoNuevo.innerText = 'La descripción debe contener solo letras' 
        + ' y tener entre 3 y 50 caracteres';
        labelDescripcionProductoNuevo.style.color = 'red';
    }
}

function validarPrecioProductoNuevo(comprobarPrecioProductoNuevo) {
    const precioValido = /[0-9]{1,6}/;
    if(precioValido.test(comprobarPrecioProductoNuevo)) {
        console.log('precio válido');
        console.log(inputPrecioProductoNuevo.value);
        precioProductoNuevoCorrecto = true;
    } else {
        console.log('precio inválido');
        console.log(inputPrecioProductoNuevo.value);
        labelPrecioProductoNuevo.innerText = 'El precio debe contener solo números' 
        + ' y tener entre 1 y 6 caracteres';
        labelPrecioProductoNuevo.style.color = 'red';
    }
}

let nombreProductoNuevoCorrecto = false;
let desripcionProductoNuevoCorrecto = false;
let precioProductoNuevoCorrecto = false;

botonAgregarProductoNuevo.addEventListener('click', (evento) => {
    evento.preventDefault();
    deshabilitarTodosLosBotones();
    mensajeExito.innerText = '';

    nombreProductoNuevoCorrecto = false;
    desripcionProductoNuevoCorrecto = false;
    precioProductoNuevoCorrecto = false;

    listaMensajes.forEach( mensaje => {
        mensaje.innerText = "";
    });

    validarNombreProducto(inputNombreProductoNuevo.value);
    validarDescripcionProductoNuevo(inputDescripcionProductoNuevo.value);
    validarPrecioProductoNuevo(inputPrecioProductoNuevo.value);

    if(nombreProductoNuevoCorrecto && desripcionProductoNuevoCorrecto && precioProductoNuevoCorrecto) {
        
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
                        precio: parseInt(inputPrecioProductoNuevo.value)
                    };
        
                    mensajeExito.innerText = "Producto agregado exitosamente";
                    mensajeExito.style.color = 'red';
        
                    console.log(nuevoProducto);
                    
                    set(newProductoRef, nuevoProducto);
                    setTimeout(() => {location.reload();}, 3000);
        
                })
                .catch(error => console.log(error));
    }

    botonAgregarProductoNuevo.disabled = false;
});

function deshabilitarTodosLosBotones() {
    let botones = document.querySelectorAll('button');
    botones.forEach(boton => {
        boton.disabled = true;
    })
}