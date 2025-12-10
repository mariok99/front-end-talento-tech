import { guardar_carrito, obtener_carrito, vaciar_carrito } from "./carrito_api/carrito_api.js";
import { actualizar_contador_carrito } from "./carrito_ui.js";

export const estaVacio = () => {
    const carrito = obtener_carrito();
    return carrito.length === 0;
}
export  const agregar_a_carrito = (producto) => {
    let carrito = obtener_carrito();
    const producto_a_agregar = carrito.find(producto_en_carrito => {
        producto_en_carrito.productoId === producto.productoId
    });

    if(estaEnCarrito(producto_a_agregar)){
        carrito.push({...producto, cantidad: 1});
    }
    else{
        carrito = carrito.map(p => {
            if(p.productoId === producto.productoId){
                p.cantidad += 1;
            }
            return p;
        });
    }
    guardar_carrito(carrito);
    actualizar_contador_carrito(cantidad_prod_carrito(carrito));
}

export const mostrar_cant_productos_en_carrito = () => {
    actualizar_contador_carrito(cantidad_prod_carrito(obtener_carrito()));
    console.log(obtener_carrito());
}

//le mando producto para que se mantenga el mismo parametro para todas las funciones
export const eliminar_producto = (producto_id) => {
    let carrito = obtener_carrito();
    //tengo que buscar el producto y ver su cantidad
    //si es mayor o igual a 2 disminuyo la cantidad
    const producto_en_carrito = carrito.find(p => p.producto.productoId == producto_id);
    let cantidad_total = 0;
    if(cantidad_prod_carrito(carrito) == 0){
        const contenedor_carrito = document.getElementById('contenedor-carrito');
        contenedor_carrito.innerHTML = '';
        const acciones_carrito = document.getElementById('acciones-carrito');
        acciones_carrito.innerHTML = '';
    }
    else if(producto_en_carrito.cantidad >= 2){
        producto_en_carrito.cantidad -= 1;
    }
    else{
        //elimino el producto
        carrito = carrito.filter(p => p.producto.productoId != producto_id);
    }
    guardar_carrito(carrito);
    carrito.forEach(element => {
        cantidad_total += element.cantidad;
    });
    actualizar_contador_carrito(cantidad_total);
}

//ARREGLAR MOSTRAR MENSAJE
export const eliminar_productos = () => {
    vaciar_carrito();
    actualizar_contador_carrito(0);
    //mostrarMensaje("Carrito vaciado", undefined)
}

export const calcular_total_carrito = () => {
    const carrito = obtener_carrito();
    let total = 0;
    carrito.forEach(item => {
        total += (item.producto.precio * item.cantidad)});
    return total;
}

function estaEnCarrito(producto_a_agregar) {
    return producto_a_agregar === undefined;
}

function cantidad_prod_carrito(carrito) {
    let cantidad_total = 0;
    carrito.forEach(element => {
        cantidad_total += element.cantidad;
    });
    return cantidad_total;
}