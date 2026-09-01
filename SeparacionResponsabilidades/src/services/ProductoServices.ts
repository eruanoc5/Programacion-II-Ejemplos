import { Producto } from "../models/Producto";

export class ProductoServices {

    agregarProducto(productos: Producto[], nombre: string, precio: number): Producto[] {
        
        if (nombre.trim() === "") {
            console.error("El nombre del producto no puede estar vacío.");
        return productos;
        }

        if(precio <= 100) {
            console.error("El precio del producto debe ser mayor a cero.");
            return productos;
        }

        const nuevoProducto = new Producto(productos.length + 1, nombre, precio);
        return [...productos, nuevoProducto];
    }

    eliminarProducto(productos: Producto[], id: number): Producto[] {
        return productos.filter((producto) => producto.id !== id);
    }
}
