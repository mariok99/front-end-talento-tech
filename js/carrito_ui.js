//renderizar productos del carrito
//renderizar botones de acciones sobre el carrito, no sé cuales todavía 
//tener en cuenta el caso que se eliminen todos los productos, hayq que borrar todos los botones
import { estaVacio } from "./funciones_carrito.js";
import { generarTarjetaDeProductos_y_añadir_a_contenedor } from "./generarTarjetaDeProductos_y_añadir_a_contenedor.js";
import { agregarListenerAContenedorParaBotones } from "./utils/agregar_evento_a_contenedor.js";
import { eliminar_productos, eliminar_producto, 
    mostrar_cant_productos_en_carrito, calcular_total_carrito } from "./funciones_carrito.js";
import { set_attrs } from "./utils/set_attrs.js";
//el problema ocurre por que el carrito que obtengo ya tiene la ruta modificada
document.addEventListener("DOMContentLoaded", () => {
    //renderiza carrito, voy a usar la funcion que usé antes en index.js
    const contenedor_carrito = document.getElementById("contenedor-carrito");
    const ruta_imagenes = '../img/';

    if(estaVacio()){
        const aviso = document.createElement('h3');
        aviso.textContent = "El carrito está vacío :(";
        contenedor_carrito.appendChild(aviso);
        return;
    }

    const producto_con_cantidad = carrito.map(item => ({ ...item.producto, cantidad: item.cantidad }));
    mostrar_cant_productos_en_carrito();
    generarTarjetaDeProductos_y_añadir_a_contenedor(producto_con_cantidad, contenedor_carrito, ruta_imagenes, 'eliminar-producto', "Eliminar del carrito", "");
    mostrar_total_carrito();

    const accion_a_realizar_luego_del_click = 
            (producto_id, _productoHTMLElement, _mensajeExito, _mensajeError, _url) => {
                const cantidadHTMLElement = _productoHTMLElement.querySelector('.cantidad-producto');
                console.log("CANTIDAD", cantidadHTMLElement.dataset.cantidad);
                if (cantidadHTMLElement !== null){
                    const cantidadInt = parseInt(cantidadHTMLElement.dataset.cantidad);
                    if(cantidadInt > 1){
                        //disminuir la cantidad
                        let nueva_cantidad = cantidadInt - 1;
                        cantidadHTMLElement.dataset.cantidad = nueva_cantidad;
                        cantidadHTMLElement.textContent = `Cantidad: ${nueva_cantidad}`;
                    }
                    else {
                        _productoHTMLElement.remove();
                    }
                    eliminar_producto(producto_id);
                    mostrar_total_carrito();
                }
    }
    //tengo que agregar que se vea la cantidad pedida
    agregarListenerAContenedorParaBotones("contenedor-carrito", "eliminar-producto","", 
            "eliminado del carrito", "error al eliminar del carrito", accion_a_realizar_luego_del_click);
    
    agregar_boton_vaciar_carrito();
})

function mostrar_total_carrito() {
    const total = calcular_total_carrito();
    const total_carrito = document.getElementById('total-pagar');
    console.log("TOTAL", total_carrito);
    total_carrito.textContent = `${total}`;
}

function agregar_boton_vaciar_carrito() {
    const contenedor_carrito = document.getElementById("contenedor-carrito");
    const boton_vaciar = document.createElement('button');
    boton_vaciar.textContent = "Vaciar Carrito";
    set_attrs(boton_vaciar, {class:"vaciar-carrito"}) ;

    const acciones_carrito = document.getElementById('acciones-carrito')
    acciones_carrito.appendChild(boton_vaciar);

    boton_vaciar.addEventListener("click", () => {
        eliminar_productos();
        contenedor_carrito.innerHTML = '';
        const aviso = document.createElement('h3');
        aviso.textContent = "El carrito está vacío :(";
        contenedor_carrito.appendChild(aviso);
        acciones_carrito.innerHTML='';
        mostrar_total_carrito();
    });
}

//aca es raro que actualizar_carrito se use en funciones carrito, acoplamiento malo?
export const actualizar_contador_carrito = (cantidad) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidad;
    }
    else{
        throw new Error("No se encontró el elemento contador-carrito");
    }
}
