import UsuarioRegistradoService from "./usuariosRegistradosService.js";

const listadoClientes = document.getElementById("contenedor_mesas_reservadas");
listadoClientes.style.textAlign = "center";

const listaUsuarios = new UsuarioRegistradoService();

listaUsuarios
  .getUsuarioRegistrado()
  .then((usuarios) => {
    let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);
    console.log(listaUsuarios);

    listaUsuarios.forEach((cliente) => {
      if (cliente.reservasPagadas != undefined) {
        const clientesAgendados = document.createElement("p");
        clientesAgendados.innerText = `${cliente.nombre} ha reservado los días ${cliente.reservasPagadas}`;
        clientesAgendados.style.marginLeft = "220px";
        clientesAgendados.style.marginRight = "220px";
        const subrayado = document.createElement("p");
        subrayado.innerText =
          "..............................................................................................................................................................................................................";
        subrayado.style.color = "gray";
        listadoClientes.appendChild(clientesAgendados);
        listadoClientes.appendChild(subrayado);
      }
    });
  })
  .catch((error) => console.log(error));
