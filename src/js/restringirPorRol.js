if(sessionStorage.getItem('rolUsuario') == 1) {
    document.querySelector('#pedidos_pendientes').style.display = 'none';
    document.querySelector('#reservas').style.display = 'none';
    document.querySelector('#clientes').style.display = 'none';
    document.querySelector('#ingresos').style.display = 'none';
    document.querySelector('#cargar_consumicion').style.display = 'none';
    document.querySelector('#registro').style.display = 'none';
}
if(sessionStorage.getItem('rolUsuario') == 2) {
    document.querySelector('#pedidos_pendientes').style.display = 'none';
    document.querySelector('#cargar_pedidos').style.display = 'none';
    document.querySelector('#clientes').style.display = 'none';
    document.querySelector('#ingresos').style.display = 'none';
    document.querySelector('#cargar_consumicion').style.display = 'none';
    document.querySelector('#registro').style.display = 'none';
}
if(sessionStorage.getItem('rolUsuario') == 3) {
    document.querySelector('#reservas').style.display = 'none';
    document.querySelector('#cargar_pedidos').style.display = 'none';
    document.querySelector('#clientes').style.display = 'none';
    document.querySelector('#ingresos').style.display = 'none';
    document.querySelector('#cargar_consumicion').style.display = 'none';
    document.querySelector('#registro').style.display = 'none';
}