// archivo: Usuario.js
export class Carrito {
    constructor(productos) {
      this.productos = productos;
    }
  
    agregarProducto(nuevoProducto) {
      this.productos.push(nuevoProducto);
    }
    eliminarProductos(idProducto) {
        //no sé como buscar un productos, ya que no se que estructura va a tener
    }
  }