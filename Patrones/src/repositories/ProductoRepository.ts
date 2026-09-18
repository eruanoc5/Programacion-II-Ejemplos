import { Producto } from "../models/Producto"

export class ProductoRepository{

    private static instancia: ProductoRepository;

    private constructor() {}

    private productos: Producto[] = [
        new Producto(1, "Laptop", 1000),
        new Producto(2, "Mouse", 150),
        new Producto(3, "Teclado", 350),
    ];

    private siguienteId = this.productos.length + 1;

    public static obtenerInstancia(): ProductoRepository{
        if(!ProductoRepository.instancia){
            ProductoRepository.instancia = new ProductoRepository();
        }

        return ProductoRepository.instancia;
    }

    obtenerProductos(): Producto[] {
        return this.productos;
    }

    guardarProducto(nombre: string, precio: number): Producto[]{

        const nuevoProducto = new Producto(
            this.siguienteId,
            nombre,
            precio
        )

        this.productos.push(nuevoProducto);
        this.siguienteId++;

        return this.productos;
    }

    eliminarProducto(id: number): Producto[]{

        this.productos = this.productos.filter(
            producto => producto.id !== id
        );

        return this.productos;
    }
}