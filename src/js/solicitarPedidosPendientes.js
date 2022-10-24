import { database } from './conexionBD.js';
import { ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import PedidosPendientesService from './pedidosPendientesService.js';
import PedidosPagadosService from './pedidosPagadosService.js';

const listadoPedidosPendientes = document.getElementById('contenedor_pedidos_pendientes');

const listaPedidosPendientes = new PedidosPendientesService;

listaPedidosPendientes.getPedidosPendientes()
    .then((pedidos) => {
        let listaPedidos = Object.keys(pedidos).map((nombre) => pedidos[nombre]);
        console.log(listaPedidos);

        listaPedidos.forEach( pedido => {
            if(pedido.mesa != undefined && pedido.estadoPago == 'sin pagar') {
                const pedidoPendiente = document.createElement('div');
                pedidoPendiente.className = 'pedido-pendiente';
                pedidoPendiente.id = `pedido${pedido.id}`;
                const numeroMesa = document.createElement('div');
                numeroMesa.className = 'item';
                numeroMesa.innerText = `Mesa ${pedido.mesa}`;
                pedidoPendiente.appendChild(numeroMesa);
                const nombreCliente = document.createElement('div');
                nombreCliente.className = 'item';
                nombreCliente.innerText = `${pedido.nombreCliente}`;
                pedidoPendiente.appendChild(nombreCliente);
                const montoTotal = document.createElement('div');
                montoTotal.className = 'item';
                montoTotal.innerText = `$${pedido.montoTotal}`;
                pedidoPendiente.appendChild(montoTotal);
                const formaPago = document.createElement('div');
                formaPago.className = 'item';

                const selectorFormaPago = document.createElement('select');
                selectorFormaPago.id = `formaPago${pedido.id}`;

                const opcion1 = document.createElement('option');
                opcion1.value = 'debito';
                opcion1.innerText = "Tarjeta de débito";
                selectorFormaPago.appendChild(opcion1);
                const opcion2 = document.createElement('option');
                opcion2.value = 'credito';
                opcion2.innerText = "Tarjeta de crédito";
                selectorFormaPago.appendChild(opcion2);
                const opcion3 = document.createElement('option');
                opcion3.value = 'digital';
                opcion3.innerText = "Plataforma digital";
                selectorFormaPago.appendChild(opcion3);
                const opcion4 = document.createElement('option');
                opcion4.value = 'efectivo';
                opcion4.innerText = "Efectivo";
                selectorFormaPago.appendChild(opcion4);

                formaPago.appendChild(selectorFormaPago);

                pedidoPendiente.appendChild(formaPago);

                const contenedorBotonGenerarFactura = document.createElement('div');
                contenedorBotonGenerarFactura.className = 'item';
                
                const elementoClickeable = document.createElement('a');
                contenedorBotonGenerarFactura.appendChild(elementoClickeable);
                const botonGenerarFactura = document.createElement('button');
                botonGenerarFactura.className = "btn";
                botonGenerarFactura.innerText = "Generar Factura";
                contenedorBotonGenerarFactura.appendChild(botonGenerarFactura);
                
                pedidoPendiente.appendChild(contenedorBotonGenerarFactura);

                listadoPedidosPendientes.appendChild(pedidoPendiente);

                botonGenerarFactura.addEventListener('click', (evento) => {
                    evento.preventDefault();
                    deshabilitarTodosLosBotones();

                    const refObtenerDatosPedido = ref(database, `pedidosPendientes/pedido${pedido.id}/estadoPago`);

                    const pagoRealizado = new PedidosPagadosService;

                        const pedidoPagadoRef = ref(database, `pedidosPagados/pedidoPagado${pedido.id}`);
                        const actualizarCantidadPedidosPagadosRef = ref(database, 'pedidosPagados/cantidadPedidosPagados');
    
                        let fechaActual = new Date();
                        const regExDias = /\d{2}/.exec(fechaActual);
                        let mes = '';
                        if(fechaActual.getMonth() + 1 < 10) {
                            mes = '0';
                            mes += fechaActual.getMonth() + 1;
                        } else {
                            mes += fechaActual.getMonth() + 1;
                        }
                        fechaActual = fechaActual.getFullYear() + '-' + mes + '-' + regExDias[0];
                        console.log(fechaActual);

                        //Se guarda en la BD el pedido pagado y se genera la factura correspondiente
    
                        pagoRealizado.getCantidadPedidosPagados()
                            .then(cantidad => {

                                const pedidoPagado = {
                                    id: cantidad + 1,
                                    mesa: pedido.mesa,
                                    fecha: fechaActual,
                                    nombreCliente: pedido.nombreCliente,
                                    montoTotal: pedido.montoTotal,
                                    formaPago: document.getElementById(`formaPago${pedido.id}`).value
                                };
            
                                console.log(pedidoPagado);
                                setTimeout(() => {location.reload();}, 2000);
                                
                                set(pedidoPagadoRef, pedidoPagado);
                                set(refObtenerDatosPedido, "pagado");
                                set(actualizarCantidadPedidosPagadosRef, cantidad + 1);

                                const doc = new jsPDF();
                                doc.text(`Factura Numero: ${cantidad + 1}`, 20, 10);
                                doc.text(`Fecha: ${fechaActual}`, 20, 20);
                                doc.text(`Mesa Numero: ${pedido.mesa}`, 20, 30);
                                doc.text(`Monto total: ${pedido.montoTotal}`, 20, 40);
                                doc.text(`Nombre del cliente: ${pedido.nombreCliente}`, 20, 50);
                                doc.text(`Forma de pago: ${document.getElementById(`formaPago${pedido.id}`).value}`, 20, 60);
                                doc.save(`factura${cantidad + 1}.pdf`);
                            })
                            .catch(error => console.log(error));
                })
            }
        })

    })
    .catch(error => console.log(error));

    function deshabilitarTodosLosBotones() {
        let botones = document.querySelectorAll('button');
        botones.forEach(boton => {
            boton.disabled = true;
        })
    }