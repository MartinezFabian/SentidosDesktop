import PedidosPendientesService from './pedidosPendientesService.js';

const listadoPedidosPendientes = document.getElementById('contenedor_pedidos_pendientes');

const listaPedidosPendientes = new PedidosPendientesService;

listaPedidosPendientes.getPedidosPendientes()
    .then((pedidos) => {
        let listaPedidos = Object.keys(pedidos).map((nombre) => pedidos[nombre]);
        console.log(listaPedidos);

        listaPedidos.forEach( pedido => {
            if(pedido.mesa != undefined) {
                const pedidoPendiente = document.createElement('div');
                pedidoPendiente.className = 'pedido-pendiente';
                const numeroMesa = document.createElement('div');
                numeroMesa.className = 'item';
                numeroMesa.innerText = `Mesa ${pedido.mesa}`
                pedidoPendiente.appendChild(numeroMesa);
                const nombreCliente = document.createElement('div');
                nombreCliente.className = 'item';
                nombreCliente.innerText = `${pedido.nombreCliente}`
                pedidoPendiente.appendChild(nombreCliente);
                const montoTotal = document.createElement('div');
                montoTotal.className = 'item';
                montoTotal.innerText = `$${pedido.montoTotal}`
                pedidoPendiente.appendChild(montoTotal);
                const formaPago = document.createElement('div');
                formaPago.className = 'item';

                const selectorFormaPago = document.createElement('select');

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
            }
        })

    })
    .catch(error => console.log(error));