import PedidosPagadosService from './pedidosPagadosService.js';

const formulario = document.getElementById('formulario_ingresos');

const inputFechaInicial = document.getElementById('fecha-rango-inicio');
const inputFechaFinal = document.getElementById('fecha-rango-final');
const inputFormaPago = document.getElementById('forma_pago');

const botonGenerarInforme = document.getElementById('btn_generar_informe');

botonGenerarInforme.addEventListener('click', (evento) => {
    evento.preventDefault();
    console.log(inputFechaInicial.value);
    console.log(inputFechaFinal.value);
    console.log(inputFormaPago.value);

    const contenedoresConsultasPrevias = document.querySelectorAll('.contenedorConsultaPago');
    if(document.getElementById('montoTotalConsulta')) {
        document.getElementById('montoTotalConsulta').remove();
    }
    contenedoresConsultasPrevias.forEach( consulta => {
        consulta.remove();
    });

    const listaPagos = new PedidosPagadosService;

    listaPagos.getPedidosPedidosPagados()
    .then( pagos => {
        let listaPagos = Object.keys(pagos).map((nombre) => pagos[nombre]);
        console.log(listaPagos);

        let pagosDentroEspecificaciones = [];
        let indice = 0;
        const regEx = /\d{2}$/;
        
        let diasInputFechaInicial = regEx.exec(inputFechaInicial.value);
        let diasInputFechaFinal = regEx.exec(inputFechaFinal.value);
        console.log('dias fecha inicial: ' + diasInputFechaInicial[0]);
        console.log('dias fecha final: ' + diasInputFechaFinal[0]);

        listaPagos.forEach( pago => {

            if(pago.fecha != undefined) {
                console.log(pago.fecha);
                let diasFechaPago = regEx.exec(pago.fecha);
                console.log('dias fecha pago: ' + diasFechaPago[0]);
            
                if(pago.formaPago == inputFormaPago.value &&
                   parseInt(diasFechaPago[0]) <= parseInt(diasInputFechaFinal[0]) &&
                   parseInt(diasFechaPago[0]) >= parseInt(diasInputFechaInicial[0])) {
                    

                    pagosDentroEspecificaciones[indice] = pago;
                    indice++;
                }
            }
        });

        console.log(pagosDentroEspecificaciones);

        let ingresoTotalPeriodo = 0;

        pagosDentroEspecificaciones.forEach( pago => {
            ingresoTotalPeriodo += parseInt(pago.montoTotal);
        });

        const montoTotal = document.createElement('h1');
        montoTotal.id = "montoTotalConsulta";
        montoTotal.innerText = `El total facturado durante el período es de ${ingresoTotalPeriodo}`;
        formulario.appendChild(montoTotal);

        pagosDentroEspecificaciones.forEach( pago => {
            const contenedorPago = document.createElement('div');
            contenedorPago.className = 'contenedorConsultaPago';

            const subTotal = document.createElement('p');
            subTotal.innerText = `$${pago.montoTotal}`;
            contenedorPago.appendChild(subTotal);
            const fechaPago = document.createElement('h3');
            fechaPago.innerText = `Pagados el día ${pago.fecha} en la mesa ${pago.mesa}`;
            contenedorPago.appendChild(fechaPago);

            formulario.appendChild(contenedorPago);
        });
    })
    .catch(error => console.log(error));
});