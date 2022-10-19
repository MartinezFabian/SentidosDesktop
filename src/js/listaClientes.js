import UsuarioRegistradoService from "./usuariosRegistradosService.js";

const listadoClientes = document.getElementById("contenedor_listado_clientes");

const listaUsuarios = new UsuarioRegistradoService();

listaUsuarios
  .getUsuarioRegistrado()
  .then((usuarios) => {
    let listaUsuarios = Object.keys(usuarios).map((nombre) => usuarios[nombre]);
    console.log(listaUsuarios);

    listaUsuarios.forEach((cliente) => {
      if (cliente.rol == "cliente") {
        const clientesAgendados = document.createElement("p");
        clientesAgendados.innerText = `${cliente.nombre}`;
        listadoClientes.appendChild(clientesAgendados);
        clientesAgendados.style.marginLeft = "90px";
        clientesAgendados.style.marginRight = "90px";
        clientesAgendados.style.marginBottom = "0px";
        clientesAgendados.style.marginTop = "0px";
        clientesAgendados.style.padding = "0px";
        const subrayado = document.createElement("p");
        subrayado.style.marginTop = "0px";
        subrayado.style.marginBottom = "0px";
        subrayado.style.padding = "0px";
        subrayado.style.color = "gray";
        subrayado.innerText =
          "....................................................................................................";
        listadoClientes.appendChild(clientesAgendados);
        listadoClientes.appendChild(subrayado);
      }
    });
  })
  .catch((error) => console.log(error));
