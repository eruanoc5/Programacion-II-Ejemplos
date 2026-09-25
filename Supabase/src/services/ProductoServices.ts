import { Producto } from "../models/Producto";
import { ProductoRepository } from "../repositories/ProductoRepository";

export class ProductoServices {

    private productoRepository: ProductoRepository;

    constructor() {
        this.productoRepository = new ProductoRepository();
    }

    async obtenerProductos(): Promise<Producto[]> {
        return await this.productoRepository.obtenerProductos();
    }

    async agregarProducto(nombre: string, precio: number): Promise<Producto | null> {

        if (nombre.trim() === "") {
            console.error("El nombre del producto no puede estar vacío.");
            return null;
        }

        if(precio <= 0) {
            console.error("El precio del producto debe ser mayor a cero.");
            return null;
        }

        return await this.productoRepository.agregarProducto(nombre, precio);
    }

    async eliminarProducto(id: number): Promise<void> {
        await this.productoRepository.eliminarProducto(id);
    }
}
