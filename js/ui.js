export const actualizar_contador_carrito = (cantidad) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = cantidad;
    }
}

export const mostrarMensaje = (texto, _HTMLElement) => {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.classList.add('mensaje');
    mensajeDiv.textContent = texto;

    _HTMLElement.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}