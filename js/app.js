'use strict';

// variables
const presupuestoUsuario = prompt('Cuál es tu presupuesto semanal ?');
let cantidadPresupuesto;
const form = document.getElementById('agregar-gasto');


/***************************************************Clases********************************************** */

// clases
// clase de presupuesto
class Presupuesto {

    constructor(presupuesto) {

        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    // método para ir restando el presupuesto
    presupuestoRestante(cantidad = 0) {

        return this.restante -= Number(cantidad);
    }
}

// clase de interfaz
class Interfaz {

    // insertamos valores en el html
    insertarPresupuesto(cantidad) {

        const presupuestoSpan = document.getElementById('total');
        const restanteSpan = document.getElementById('restante');
        
        // insertar html
        presupuestoSpan.innerHTML = cantidad;
        restanteSpan.innerHTML = cantidad;
    }

    // mostramos un mensaje
    mostrarMensaje(mensaje, tipo) {

        const div = document.createElement('div');
        div.classList.add('text-center', 'alert');
        
        if (tipo === 'error') {
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        }

        div.innerHTML = mensaje;

        // insertar mensaje en el html
        document.querySelector('.primario').insertBefore(div, form);

        setTimeout(() => {

            document.querySelector('.primario .alert').remove();
            form.reset();
        }, 3000)
    }

    // agregamos un listado de gastos
    agregarListado(nombre, cantidad) {

        // <ul>
        const gastosListado = document.querySelector('#gastos ul');

        // creamos <li>
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        // insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$${cantidad}</span>
        `;

        gastosListado.appendChild(li);
    }

    // comprueba el presupuesto restante
    presupuestoRestante(cantidad) {

        const restante = document.getElementById('restante');

        // actualizamos el presupuesto
        const presupuestoNuevo = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = presupuestoNuevo;

        this.cambiaColor();
    }

    // cambia de color el presupuesto restante
    cambiaColor() {

        // variables con valores del presupuesto
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // comprobar el 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}


/*****************************************************Listeners******************************************** */


// eventlisteners
document.addEventListener('DOMContentLoaded', () => {

    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        
        // instanciar una interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});


form.addEventListener('submit', e => {

    e.preventDefault();

    // leer datos del formulario
    const gasto = document.getElementById('gasto').value;
    const cantidad = document.getElementById('cantidad').value;
    
    // instanciar interfaz
    const ui = new Interfaz();

    // comprovar que los campos no esten vacios
    if (gasto === '' || cantidad === '') {
        ui.mostrarMensaje('Error<br>Introduce los datos correctamente', 'error');
    } else {
        // insertar listado en el html
        ui.mostrarMensaje('Correcto', 'correcto');
        form.reset();
        ui.agregarListado(gasto, cantidad);
        ui.presupuestoRestante(cantidad);
    }
});