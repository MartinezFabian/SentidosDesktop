import { database } from './conexionBD.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

class PedidosPagadosService {
    constructor() {
        this.database = database;
        this.pedidosPagadosRef = ref(this.database, 'pedidosPagados');
        this.cantidadPedidosPagadosRef = ref(this.database, 'pedidosPagados/cantidadPedidosPagados');
    }

    getPedidosPedidosPagados() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.pedidosPagadosRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }

    getCantidadPedidosPagados() {
        const promise = new Promise((resolve, reject) => {
            onValue(this.cantidadPedidosPagadosRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
            }, {
                onlyOnce: true
            });
        });

        return promise;
    }
}

export default PedidosPagadosService;