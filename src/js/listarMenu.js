import ProductoRegistradoService from './productosRegistrados.js';

const contenedorListadoProductos = document.getElementById('container_menu');

const listaProductos = new ProductoRegistradoService;

listaProductos.getProductosRegistrados()
        .then((productos) => {
            let listaProductos = Object.keys(productos).map((nombre) => productos[nombre]);
            console.log(listaProductos);

            let contadorProductos = 0;

            listaProductos.forEach( producto => {
                let palabrasIguales = false;
                /* if(producto.nombre != undefined) {
                    for(let i = 0; i < inputBusquedaProductos.value.length; i++) {
                        if(inputBusquedaProductos.value[i] != producto.nombre[i].toLowerCase() && 
                        inputBusquedaProductos.value[i] != producto.nombre[i].toUpperCase()) {
                            palabrasIguales = false;
                            break;
                        }
                        if(inputBusquedaProductos.value[inputBusquedaProductos.value.length - 1] ==
                            producto.nombre[i].toLowerCase() ||
                            inputBusquedaProductos.value[inputBusquedaProductos.value.length - 1] ==
                            producto.nombre[i].toUpperCase()) {
                                palabrasIguales = true;
                        }
                    }
                } */
                if(producto.nombre != undefined) {
                    contadorProductos++;

                    const contenedorMenuFlex = document.createElement('div');
                    contenedorMenuFlex.className = 'container-flex-menu';
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    contenedorMenuFlex.appendChild(menuItem);
                    const menuContent = document.createElement('div');
                    menuContent.className = 'menu-content';
                    menuItem.appendChild(menuContent);
                    const productoNombre = document.createElement('p');
                    productoNombre.innerText = `${producto.nombre}`;
                    menuContent.appendChild(productoNombre);
                    const productoPrecio = document.createElement('span');
                    productoPrecio.innerText = `$${producto.precio}`;
                    menuContent.appendChild(productoPrecio);
                    const productoIngredientes = document.createElement('div');
                    productoIngredientes.innerText = `${producto.ingredientes}`;
                    productoIngredientes.className = 'menu-ingredients';
                    menuItem.appendChild(productoIngredientes);

                    contenedorListadoProductos.appendChild(contenedorMenuFlex);
                }
            })
        })
        .catch(error => console.log(error));


const inputBusquedaProductos = document.getElementById('categoria-productos');
const botonBusquedaProductos = document.getElementById('boton-buscar-categoria');

botonBusquedaProductos.addEventListener('click', () => {
    let contenedoresDiv = document.querySelectorAll('div');
    contenedoresDiv.forEach( contenedor => {
        if(contenedor.className == 'container-flex-menu') {
            contenedor.remove();
        }
    });

    listaProductos.getProductosRegistrados()
        .then((productos) => {
            let listaProductos = Object.keys(productos).map((nombre) => productos[nombre]);
            console.log(listaProductos);

            let contadorProductos = 0;

            listaProductos.forEach( producto => {
                if(producto.categoria == inputBusquedaProductos.value || 
                    (inputBusquedaProductos.value == 'todo' && producto.nombre != undefined) ) {
                    contadorProductos++;

                    const contenedorMenuFlex = document.createElement('div');
                    contenedorMenuFlex.className = 'container-flex-menu';
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    contenedorMenuFlex.appendChild(menuItem);
                    const menuContent = document.createElement('div');
                    menuContent.className = 'menu-content';
                    menuItem.appendChild(menuContent);
                    const productoNombre = document.createElement('p');
                    productoNombre.innerText = `${producto.nombre}`;
                    menuContent.appendChild(productoNombre);
                    const productoPrecio = document.createElement('span');
                    productoPrecio.innerText = `$${producto.precio}`;
                    menuContent.appendChild(productoPrecio);
                    const productoIngredientes = document.createElement('div');
                    productoIngredientes.innerText = `${producto.ingredientes}`;
                    productoIngredientes.className = 'menu-ingredients';
                    menuItem.appendChild(productoIngredientes);

                    contenedorListadoProductos.appendChild(contenedorMenuFlex);
                }
            })
        })
        .catch(error => console.log(error));
});