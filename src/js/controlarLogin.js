import UsuarioRegistradoService from './usuariosRegistradosService.js'

const inputNombreUsuario = document.getElementById('usuario-ingresado');
const inputContrasena = document.getElementById('contrasena-ingresado');

const botonIngresar = document.getElementById('boton-ingresar');

const listaMensajes = document.querySelectorAll('.mensaje');
const labelContrasena = document.getElementById('label_contrasena');
const labelUsuario = document.getElementById('label_usuario');

botonIngresar.addEventListener('click', (evento) => {
    evento.preventDefault();

    listaMensajes.forEach( mensaje => {
        mensaje.innerText = '';
    });

    const busquedaUsuario = new UsuarioRegistradoService;

    busquedaUsuario.getUsuarioRegistrado()
    .then( usuarios => {
        let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);

        const BreakError = {};

        listaUsuarios.forEach( usuarioRegistrado => {
            if(usuarioRegistrado.nombre == inputNombreUsuario.value &&
                usuarioRegistrado.contrasena == inputContrasena.value &&
                (usuarioRegistrado.rol == 'dueño' || usuarioRegistrado.rol == 'maitre' || 
                usuarioRegistrado.rol == 'caja' || usuarioRegistrado.rol == 'mozo' || 
                usuarioRegistrado.rol == 'chef')) {
                    if(usuarioRegistrado.rol == 'mozo') {
                        sessionStorage.setItem('rolUsuario', 1);
                        location.href ='../view/cargar_pedidos.html';
                    }
                    if(usuarioRegistrado.rol == 'maitre') {
                        sessionStorage.setItem('rolUsuario', 2);
                        location.href ='../view/reservas.html';
                    }
                    if(usuarioRegistrado.rol == 'caja') {
                        sessionStorage.setItem('rolUsuario', 3);
                        location.href ='../view/pedidos_pendientes.html';
                    }
                    if(usuarioRegistrado.rol == 'chef') {
                        sessionStorage.setItem('rolUsuario', 4);
                        location.href ='../view/cargar_consumicion.html';
                    }
                    if(usuarioRegistrado.rol == 'dueño') {
                        location.href ='../view/ingresos.html';
                    }
                } else if(usuarioRegistrado.nombre == inputNombreUsuario.value &&
                    usuarioRegistrado.contrasena != inputContrasena.value &&
                    (usuarioRegistrado.rol == 'dueño' || usuarioRegistrado.rol == 'maitre' || 
                    usuarioRegistrado.rol == 'caja' || usuarioRegistrado.rol == 'mozo' || 
                    usuarioRegistrado.rol == 'chef')) {
                        labelContrasena.innerText = "Contraseña incorrecta";
                        labelContrasena.style.color = 'red';
                        throw BreakError;
                }

                if(labelContrasena.innerText != "") {
                    labelUsuario.innerText = 'No se ha encontrado un usuario con ese nombre de usuario.'
                    labelUsuario.style.color = 'red';
                }
        })
    })
    .catch(error => console.log(error));
});