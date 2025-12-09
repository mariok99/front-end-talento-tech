//import { agregarListenerAContenedorParaBotones } from "../utils/agregar_evento_a_contenedor.js";
//import { agregar_a_carrito, mostrar_cant_productos_en_carrito } from "./funciones_carrito_productos.js";
//import { mostrarMensaje } from "./ui.js";
import { generarTarjetaDeProductos_y_añadir_a_contenedor } from "./generarTarjetaDeProductos_y_añadir_a_contenedor.js";
import { ruta_imagenes, ruta_productos_data } from "./rutas/rutas_productos.js";

//BUENO DEJE ANDANDO TODO, EL CARRITO ANDA.
document.addEventListener("DOMContentLoaded", async () => {
    const contenendor_tarjetas_productos = document.getElementById("contenedor-tarjeta");
    //debo traer la info del json y generar los elementos en el dom
    //todos los elementos se crean de la misma forma, entonces voy a crear una función
    //que a partir de un producto del json genere todo el html para ese producto
    //mostrar_cant_productos_en_carrito();

    const productos = await fetch(ruta_productos_data)
    if (!productos.ok){
        throw new Error(`error HTTP status: ${res.status}`);
    }
 
    const productosJSON = await productos.json();
    console.log("PRODUCTOS JSON:", productosJSON);
    
    generarTarjetaDeProductos_y_añadir_a_contenedor(productosJSON, contenendor_tarjetas_productos, 
        ruta_imagenes, 'agregar-carrito', "", "fa-solid fa-cart-shopping fa-lg"
    );
    //problema: agrego al carrito la ruta de imagen modificada
    //const accion_a_realizar_luego_del_click = 
    //    (producto_id, _productoHTMLElement, _mensajeExito, _mensajeError, _url) => {
    //        console.log("PRODUCTO ID EN ACCION A REALIZAR:", producto_id);
    //        agregar_a_carrito(productosJSON.find(p => p.productoId == producto_id));
    //        mostrarMensaje("Producto agregado al carrito", _productoHTMLElement);
    //    }
    
    //agregarListenerAContenedorParaBotones("contenedor-tarjeta", "agregar-carrito","", 
     //   "agregado al carrito", "error al agregar al carrito", accion_a_realizar_luego_del_click);
});

export async function agregarListenerAContenedorParaBotones(contenedorAEscuchar, 
    claseDeBotonObjetivo, url, mensajeExito, mensajeError,
    accionARealizarSobreElem) {
    const contenedorProductos = document.getElementById(contenedorAEscuchar);

    if (!contenedorProductos) return;

    contenedorProductos.addEventListener('click', async (event) => {
        const target = event.target;

        
        const button = target.closest(`.${claseDeBotonObjetivo}`);

        if (!button) return;

        event.preventDefault();

        const producto_id = button.dataset.id;

        const productoElement = button.closest('article');

        if (!productoElement) {
            mostrarNotificacion('No se pudo encontrar el elemento del producto', 'error');
            return;
        }

        try {
            button.disabled = true;
            accionARealizarSobreElem(producto_id, productoElement, mensajeExito, mensajeError, url);
        
            
        } catch (error) {
            button.disabled = false;
            mostrarNotificacion('Error de conexión', 'error');
            console.error(error);
        }
        button.disabled = false;
    });
    
}

function mostrarNotificacion(mensaje, tipo) {
    alert(mensaje);
    console.log(`[${tipo}] ${mensaje}`);
}




