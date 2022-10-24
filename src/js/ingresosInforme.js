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
    const lineasDivisorias = document.querySelectorAll('.lineaDivisoria');
    if(document.getElementById('montoTotalConsulta') && document.getElementById('pdf_informe_ingresos')
    && document.getElementById('aviso')) {
        document.getElementById('montoTotalConsulta').remove();
        document.getElementById('pdf_informe_ingresos').remove();
        document.getElementById('aviso').remove();
    }
    contenedoresConsultasPrevias.forEach( consulta => {
        consulta.remove();
    });
    lineasDivisorias.forEach( linea => {
        linea.remove();
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
        montoTotal.innerText = `El total facturado durante el período es de: ${ingresoTotalPeriodo}`;
        formulario.appendChild(montoTotal);

        const botonGenerarPDFInformeIngresos = document.createElement('button');
        botonGenerarPDFInformeIngresos.innerText = "Generar PDF del informe de ingresos";
        botonGenerarPDFInformeIngresos.id = "pdf_informe_ingresos";
        formulario.appendChild(botonGenerarPDFInformeIngresos);

        botonGenerarPDFInformeIngresos.addEventListener('click', (evento) => {
            evento.preventDefault();
            const listaCheckboxs = document.querySelectorAll('.input_type_checkbox');
            listaCheckboxs.forEach( pdfSolicitado => {
                if(pdfSolicitado.checked) {
                    console.log(pdfSolicitado);
                }
            });
        });

        const aviso = document.createElement('p');
        aviso.id = 'aviso';
        aviso.innerText = 'Marque las casillas de los subtotales que desea generar un PDF particular';
        formulario.appendChild(aviso);

        let numeroPagoEncontrado = 0;

        pagosDentroEspecificaciones.forEach( pago => {
            const lineaDivisoria = document.createElement('p');
            lineaDivisoria.className = "lineaDivisoria";
            lineaDivisoria.innerText = "_";
            lineaDivisoria.style.color = 'white';
            lineaDivisoria.style.backgroundColor = 'gray';
            lineaDivisoria.style.height = '10px';
            formulario.appendChild(lineaDivisoria);

            numeroPagoEncontrado++;
            const contenedorPago = document.createElement('div');
            contenedorPago.className = 'contenedorConsultaPago';

            const subTotal = document.createElement('p');
            subTotal.id = `pago_encontrado_numero${numeroPagoEncontrado}`;
            subTotal.innerText = `El subtotal ${numeroPagoEncontrado} es $${pago.montoTotal}`;
            contenedorPago.appendChild(subTotal);
            const fechaPago = document.createElement('h3');
            fechaPago.innerText = `Pagados el día ${pago.fecha} en la mesa ${pago.mesa}`;
            contenedorPago.appendChild(fechaPago);
            
            const inputGenerarPDFPagoSubtotal = document.createElement('input');
            inputGenerarPDFPagoSubtotal.type = "checkbox";
            inputGenerarPDFPagoSubtotal.className = "input_type_checkbox";
            inputGenerarPDFPagoSubtotal.id = `checkbox_pdf_informe_subtotal_numero${numeroPagoEncontrado}`;
            contenedorPago.appendChild(inputGenerarPDFPagoSubtotal);

            const indicacionPDFSubtotal = document.createElement('p');
            indicacionPDFSubtotal.innerText = 'Generar PDF del Subtotal';
            contenedorPago.appendChild(indicacionPDFSubtotal);

            formulario.appendChild(contenedorPago);
        });
    })
    .catch(error => console.log(error));
});