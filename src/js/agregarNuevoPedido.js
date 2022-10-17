import { database } from './conexionBD.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import PedidosPendientesService from './pedidosPendientesService.js';

const inputMesa = document.getElementById('numero-mesa');
const inputNombreCliente = document.getElementById('nombre-cliente');

const botonConfirmarPedido = document.getElementById('btn_confirmar_pedido');

const mesaMensajeValidacion = document.getElementById('label_mesa_validacion');
const nombreClienteMensajeValidacion = document.getElementById('label_nombre_cliente_validacion');

const listaLegends = [mesaMensajeValidacion, nombreClienteMensajeValidacion];

let mesaCorrecto = false;
let nombreClienteCorrecto = false;

function validarMesa(comprobarMesa) {
    const dniValido = /^[1-8]{1}$/;
    if(dniValido.test(comprobarMesa)) {
        console.log('N° mesa válido');
        console.log(inputMesa.value);
        mesaCorrecto = true;
    } else {
        console.log('N° mesa inválido');
        console.log(inputMesa.value);
        mesaMensajeValidacion.innerText = 'El N° mesa debe tener solo un número del 1 al 8';
        mesaMensajeValidacion.style.color = 'red';
    }
}

function validarNombreCliente(comprobarNombreCliente) {
    const nombreValido = /^[A-ZÑ][a-zñ]{3,20}$/;
    if(nombreValido.test(comprobarNombreCliente)) {
        console.log('nombre válido');
        console.log(inputNombreCliente.value);
        nombreClienteCorrecto = true;
    } else {
        console.log('nombre inválido');
        console.log(inputNombreCliente.value);
        nombreClienteMensajeValidacion.innerText = 'El nombre debe empezar con mayúscula y seguir con' 
        + 'minúsculas y tener entre 3 y 20 caracteres';
        nombreClienteMensajeValidacion.style.color = 'red';
    }
}

botonConfirmarPedido.addEventListener('click', (evento) => {
    evento.preventDefault();
    listaLegends.forEach( mensaje => {
        mensaje.innerText = "*";
        mensaje.style.color = 'black';
    })
    
    validarMesa(inputMesa.value);
    validarNombreCliente(inputNombreCliente.value);

    if(mesaCorrecto && nombreClienteCorrecto) {

        const registroPedidos = new PedidosPendientesService;
        
        function agregarNuevoPedido() {
            registroPedidos.getCantidadPedidosPendientes()
                .then((cantidad) => {
                    console.log(cantidad + 1);
                    const actualizarCantidadPedidosRef = ref(database, 'pedidosPendientes/cantidadPedidosPendientes');
                    set(actualizarCantidadPedidosRef, cantidad + 1);

                    const newPedidoRef = ref(database, `pedidosPendientes/pedido${cantidad + 1}`);
                    console.log('usuario numero ' + (cantidad + 1) + ' agregado.');

                    //Recupero los productos y sus cantidades positivas seleccionadas
                    const listaProductosSolicitados = [];
                    let contenedoresDiv = document.querySelectorAll('div');
                    let contenedoresProductos = [];
                    let indiceContenedoresProductos = 0;
                    contenedoresDiv.forEach( contenedor => {
                        if(contenedor.className == 'container-flex-menu' && contenedor.childNodes[1].childNodes[1].valueAsNumber > 0) {
                            contenedoresProductos[indiceContenedoresProductos] = contenedor;
                            let precioSoloNumeros = '';
                            for(let i = 1; i < contenedor.childNodes[0].childNodes[0].childNodes[1].innerText.length; i++) {
                                precioSoloNumeros += contenedor.childNodes[0].childNodes[0].childNodes[1].innerText[i];
                            }
                            const producto = {
                                nombre: contenedor.childNodes[0].childNodes[0].childNodes[0].innerText,
                                precio: precioSoloNumeros,
                                cantidad: contenedor.childNodes[1].childNodes[1].valueAsNumber
                            }
                            listaProductosSolicitados[indiceContenedoresProductos] = producto;
                            indiceContenedoresProductos++;
                        }
                    });
                    console.log(contenedoresProductos);

                    let precioTotal = 0;
                    listaProductosSolicitados.forEach( producto => {
                        precioTotal += parseInt(producto.precio) * parseInt(producto.cantidad);
                    });

                    const nuevoPedido = {
                        id: cantidad + 1,
                        mesa: inputMesa.value,
                        nombreCliente: inputNombreCliente.value,
                        montoTotal: precioTotal,
                        estadoPago: "sin pagar",
                        productosSolicitados: listaProductosSolicitados
                    };

                    console.log(nuevoPedido);
                    
                    set(newPedidoRef, nuevoPedido);
                })
                .catch(error => console.log(error));
        }

        agregarNuevoPedido();
    }
    mesaCorrecto = false;
    nombreClienteCorrecto = false;
});