import { database } from './conexionBD.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

class PedidosPendientesService {
    constructor() {
        this.database = database;
        this.pedidosPendientesRef = ref(this.database, 'pedidosPendientes');
        this.cantidadPedidosPendientesRef = ref(this.database, 'pedidosPendientes/cantidadPedidosPendientes');
    }

    getPedidosPendientes() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.pedidosPendientesRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }

    getCantidadPedidosPendientes() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.cantidadPedidosPendientesRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }
}

export default PedidosPendientesService;