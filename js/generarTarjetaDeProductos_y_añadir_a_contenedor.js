import { setAttrs } from "../utils/set_attrs.js";

//debería generalizar el boton que se añade a los productos
export function generarTarjetaDeProductos_y_añadir_a_contenedor(productos, contenedor, ruta_imagenes, clase_boton, textContent_boton, clase_logo_boton) {
    productos.forEach(unProducto => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto');

        const titulo = document.createElement('h3');
        titulo.textContent = unProducto.nombre;
        tarjeta.appendChild(titulo);

        const img = document.createElement('img');
        setAttrs(img, { src: `${ruta_imagenes}/${unProducto.img}`, alt: unProducto.nombre, class: "img-producto" });
        tarjeta.appendChild(img);

        const descripcion = document.createElement('p');
        descripcion.textContent = unProducto.descripcion;
        tarjeta.appendChild(descripcion);

        const precio = document.createElement('p');
        precio.textContent = `Precio: ${unProducto.precio}`;
        tarjeta.appendChild(precio);

        const boton = document.createElement('button');
        boton.textContent = textContent_boton;
        setAttrs(boton, { class: clase_boton, "data-id": unProducto.productoId });
        const logo_carrito = document.createElement('i');
        setAttrs(logo_carrito, { class: clase_logo_boton });
        boton.appendChild(logo_carrito);
        tarjeta.appendChild(boton);

        const cantidad = document.createElement('p');
        if (unProducto.cantidad !== undefined) {
            setAttrs(cantidad, { class: 'cantidad-producto', "data-cantidad": unProducto.cantidad });
            cantidad.textContent = `Cantidad: ${unProducto.cantidad}`;
            tarjeta.appendChild(cantidad);
        }
        
        contenedor.appendChild(tarjeta);
    });
}


