import UsuarioRegistradoService from './usuariosRegistradosService.js';

const listadoClientes = document.getElementById('contenedor_listado_clientes');

const listaUsuarios = new UsuarioRegistradoService;

listaUsuarios.getUsuarioRegistrado()
    .then((usuarios) => {
        let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);
        console.log(listaUsuarios);

        listaUsuarios.forEach( cliente => {
            const clientesAgendados = document.createElement('h3');
            clientesAgendados.innerText = `${cliente.nombre}`;
            listadoClientes.appendChild(clientesAgendados);
        })

    })
    .catch(error => console.log(error));