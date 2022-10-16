import { database } from './conexionBD.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import UsuarioRegistradoService from './usuariosRegistradosService.js';

const inputRol = document.getElementById('rol');
const inputDni = document.getElementById('dni');
const inputApellido = document.getElementById('apellido');
const inputNombreUsuario = document.getElementById('nombre-usuario');
const inputContrasena = document.getElementById('contrasena');

const botonRegistrarse = document.getElementById('boton-registrarse');

const nombreMensajeValidacion = document.getElementById('legend-nombre-usuario');
const apellidoMensajeValidacion = document.getElementById('legend-apellido');
const dniMensajeValidacion = document.getElementById('legend-dni');
const contrasenaMensajeValidacion = document.getElementById('legend-contrasena');

const listaLegends = [nombreMensajeValidacion, apellidoMensajeValidacion, 
    dniMensajeValidacion, contrasenaMensajeValidacion];

let nombreCorrecto = false;
let apellidoCorrecto = false;
let dniCorrecto = false;
let contrasenaCorrecto = false;

function validarNombre(comprobarNombre) {
    const nombreValido = /^[A-ZÑ][a-zñ]{3,20}$/;
    if(nombreValido.test(comprobarNombre)) {
        console.log('nombre válido');
        console.log(inputNombreUsuario.value);
        nombreCorrecto = true;
    } else {
        console.log('nombre inválido');
        console.log(inputNombreUsuario.value);
        nombreMensajeValidacion.innerText = 'El nombre debe empezar con mayúscula y seguir con' 
        + 'minúsculas y tener entre 3 y 20 caracteres';
        nombreMensajeValidacion.style.color = 'red';
    }
}

function validarApellido(comprobarApellido) {
    const apellidoValido = /^[A-ZÑ][a-zñ]{3,20}$/;
    if(apellidoValido.test(comprobarApellido)) {
        console.log('apellido válido');
        console.log(inputApellido.value);
        apellidoCorrecto = true;
    } else {
        console.log('apellido inválido');
        console.log(inputApellido.value);
        apellidoMensajeValidacion.innerText = 'El apellido debe empezar con mayúscula y seguir con' 
        + 'minúsculas y tener entre 3 y 20 caracteres';
        apellidoMensajeValidacion.style.color = 'red';
    }
}

function validarDni(comprobarDni) {
    const dniValido = /^[0-9]{6,9}$/;
    if(dniValido.test(comprobarDni)) {
        console.log('dni válido');
        console.log(dniMensajeValidacion.value);
        dniCorrecto = true;
    } else {
        console.log('dni inválido');
        console.log(dniMensajeValidacion.value);
        dniMensajeValidacion.innerText = 'El DNI debe tener solo números y poseer ' 
        + 'entre 6 y 9 caracteres';
        dniMensajeValidacion.style.color = 'red';
    }
}

function validarContrasena(comprobarContrasena) {
    const nombreContrasena = /^[a-z0-9_\-!"#$%&/()=?¡¨*ñÑ]{8,20}$/i;
    if(nombreContrasena.test(comprobarContrasena)) {
        console.log('contrasena válida');
        console.log(contrasenaMensajeValidacion.value);
        contrasenaCorrecto = true;
    } else {
        console.log('contrasena inválida');
        console.log(contrasenaMensajeValidacion.value);
        contrasenaMensajeValidacion.innerText = 'La contraseña debe tener ' 
        + 'entre 8 y 20 caracteres';
        contrasenaMensajeValidacion.style.color = 'red';
    }
}

botonRegistrarse.addEventListener('click', (evento) => {
    evento.preventDefault();
    listaLegends.forEach( mensaje => {
        mensaje.innerText = "*";
        mensaje.style.color = 'black';
    })
    
    validarNombre(inputNombreUsuario.value);
    validarApellido(inputApellido.value);
    validarDni(inputDni.value);
    validarContrasena(inputContrasena.value);

    if(nombreCorrecto && apellidoCorrecto &&
        dniCorrecto && contrasenaCorrecto) {

        const registroUsuarios = new UsuarioRegistradoService;
        
        function agregarNuevoUsuario() {
            registroUsuarios.getCantidadUsuarioRegistrado()
                .then((cantidad) => {
                    console.log(cantidad + 1);
                    const actualizarCantidadUsuarios = ref(database, 'cantidadUsuarios');
                    set(actualizarCantidadUsuarios, cantidad + 1);

                    const newUserRef = ref(database, `usuarios/usuario${cantidad + 1}`);
                    console.log('usuario numero ' + (cantidad + 1) + ' agregado.');

                    const nuevoUsuario = {
                        id: cantidad + 1,
                        rol: inputRol.value,
                        dni: inputDni.value,
                        nombre: inputNombreUsuario.value,
                        apelliddo: inputApellido.value,
                        contrasena: inputContrasena.value
                    };

                    console.log(nuevoUsuario);
                    
                    set(newUserRef, nuevoUsuario);
                })
                .catch(error => console.log(error));
        }

        agregarNuevoUsuario();
    }
    nombreCorrecto = false;
    apellidoCorrecto = false;
    dniCorrecto = false;
    contrasenaCorrecto = false;
});