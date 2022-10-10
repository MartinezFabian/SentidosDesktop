import UsuarioRegistradoService from './usuariosRegistradosService.js';

const listadoClientes = document.getElementById('contenedor_mesas_reservadas');
listadoClientes.style.textAlign = 'center';

const listaUsuarios = new UsuarioRegistradoService;

listaUsuarios.getUsuarioRegistrado()
    .then((usuarios) => {
        let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);
        console.log(listaUsuarios);

        listaUsuarios.forEach( cliente => {
            if(cliente.reservasPagadas != undefined) {
                const clientesAgendados = document.createElement('h3');
                clientesAgendados.innerText = `${cliente.nombre} ha reservado los días ${cliente.reservasPagadas}`;
                listadoClientes.appendChild(clientesAgendados);
            }
        })

    })
    .catch(error => console.log(error));