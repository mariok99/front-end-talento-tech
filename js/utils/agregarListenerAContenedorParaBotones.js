import { mostrarNotificacion } from "./mostrarNotificacion.js";


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
