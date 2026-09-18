import { Producto } from "../models/Producto";
import { ProductoRepository } from "../repositories/ProductoRepository";

export class ProductoServices {

    private productoRepository: ProductoRepository;

    constructor(){
        this.productoRepository = ProductoRepository.obtenerInstancia();
    }

    obtenerProductos(): Producto[]{
        return this.productoRepository.obtenerProductos();
    }

    agregarProducto(nombre: string, precio: number): Producto[] {
        
        if (nombre.trim() === "") {
            console.error("El nombre del producto no puede estar vacío.");
            return this.productoRepository.obtenerProductos();
        }

        if(precio <= 0) {
            console.error("El precio del producto debe ser mayor a cero.");
            return this.productoRepository.obtenerProductos();
        }

        return this.productoRepository.guardarProducto(nombre, precio)
    }

    eliminarProducto(id: number): Producto[] {
        return this.productoRepository.eliminarProducto(id);
    }
}
