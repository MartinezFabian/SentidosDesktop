import ProductoRegistradoService from './productosRegistrados.js';

const contenedorListadoProductos = document.getElementById('container_menu');

const listaProductos = new ProductoRegistradoService;

listaProductos.getProductosRegistrados()
    .then((productos) => {
        let listaProductos = Object.keys(productos).map((nombre) => productos[nombre]);
        console.log(listaProductos);

        let contadorProductos = 0;

        listaProductos.forEach( producto => {
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
                const labelProducto = document.createElement('label');
                labelProducto.id = `label-cantidad-producto${contadorProductos}`;
                labelProducto.innerText = `Cantidad:`;
                contenedorMenuFlex.appendChild(labelProducto);
                const inputCantidad = document.createElement('input');
                inputCantidad.type = "number";
                inputCantidad.name = `cantidad-producto${contadorProductos}`;
                inputCantidad.value = 0;
                labelProducto.appendChild(inputCantidad);

                contenedorListadoProductos.appendChild(contenedorMenuFlex);

                inputCantidad.addEventListener('click', () => {
                    if(inputCantidad.value == -1) {
                        inputCantidad.value = 0;
                    }
                    console.log(inputCantidad.value);
                })
            }
        })
    })
    .catch(error => console.log(error));