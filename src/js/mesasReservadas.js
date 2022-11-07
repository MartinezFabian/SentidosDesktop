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
        clientesAgendados.className = 'reserva';
        clientesAgendados.innerText = `${cliente.nombre} ha reservado los días ${cliente.reservasPagadas}`;
        clientesAgendados.style.marginLeft = "220px";
        clientesAgendados.style.marginRight = "220px";
        const subrayado = document.createElement("p");
        subrayado.className = 'subrayado';
        subrayado.innerText =
          "..............................................................................................................................................................................................................";
        subrayado.style.color = "gray";
        listadoClientes.appendChild(clientesAgendados);
        listadoClientes.appendChild(subrayado);
      }
    });
  })
  .catch((error) => console.log(error));

const botonBusqueda = document.getElementById('btn-buscar-reservas');
const inputFechaBuscada = document.getElementById('fecha-reserva');

botonBusqueda.addEventListener('click', (evento) => {
  evento.preventDefault();

  console.log(inputFechaBuscada.value);

  const regExFechaBuscada = /\d{2}/g;

  let datoAuxiliar = inputFechaBuscada.value.match(regExFechaBuscada);

  let fechaBuscadaOrdenada = datoAuxiliar[3] + datoAuxiliar[2] + '-' + datoAuxiliar[1] + '-' + datoAuxiliar[0];

  const listaReservas = document.querySelectorAll('.reserva');

  const listaReservasEncontradas = [];
  let indiceListaReservasEncontradas = 0;

  const regExFecha = /\d{4}-\d{2}-\d{2}/g;

  listaReservas.forEach( reserva => {
    let reservaAnalizada = reserva;
    
    //console.log(reservaAnalizada);
    
    let fechasReservadas = reserva.innerText.match(regExFecha);
    console.log(fechasReservadas);
    fechasReservadas.forEach( fecha => {

      console.log( fecha == fechaBuscadaOrdenada);
      console.log(fecha.length);
      console.log(fechaBuscadaOrdenada.length);

      if(fecha == fechaBuscadaOrdenada) {
        console.log(fecha);
        console.log(fechaBuscadaOrdenada);
        console.log(reservaAnalizada);
        listaReservasEncontradas[indiceListaReservasEncontradas] = reservaAnalizada;
      }
    })
  })

  const anterioresResultados = document.querySelectorAll('.reserva');
  const subrayados = document.querySelectorAll('.subrayado');

  anterioresResultados.forEach( elemento => { elemento.remove() });
  subrayados.forEach( elemento => { elemento.remove() });

  listaReservasEncontradas.forEach( reservaEncontrada => {
    const subrayado = document.createElement("p");
    subrayado.innerText =
      "..............................................................................................................................................................................................................";
    subrayado.style.color = "gray";
    listadoClientes.appendChild(reservaEncontrada);
    listadoClientes.appendChild(subrayado);
  })

  const botonRefrescar = document.createElement('button');
  botonRefrescar.innerText = 'Realizar otra búsqueda';
  listadoClientes.appendChild(botonRefrescar);

  botonRefrescar.addEventListener('click', (e) => {
    e.preventDefault();
    location.href ='../view/reservas.html';
  })
});