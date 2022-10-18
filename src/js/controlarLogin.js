import UsuarioRegistradoService from './usuariosRegistradosService.js'

const inputNombreUsuario = document.getElementById('usuario-ingresado');
const inputContrasena = document.getElementById('contrasena-ingresado');

const botonIngresar = document.getElementById('boton-ingresar');

botonIngresar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const busquedaUsuario = new UsuarioRegistradoService;

    busquedaUsuario.getUsuarioRegistrado()
    .then( usuarios => {
        let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);

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
                        location.href ='../view/cargar_pedidos.html';
                    }
                    if(usuarioRegistrado.rol == 'dueño') {
                        location.href ='../view/ingresos.html';
                    }
                }
        })
    })
    .catch(error => console.log(error));
});