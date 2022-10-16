import { database } from './conexionBD.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

class ProductoRegistradoService {
    constructor() {
        this.database = database;
        this.menuRef = ref(this.database, 'menu');
        this.cantidadProductosRegistradosRef = ref(this.database, 'menu/cantidadProductos');
    }

    getProductosRegistrados() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.menuRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }

    getCantidadProductosRegistrados() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.cantidadProductosRegistradosRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }
}

export default ProductoRegistradoService;