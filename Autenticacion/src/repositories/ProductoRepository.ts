import { Producto } from "../models/Producto";
import { supabase } from "../lib/supabase";

export class ProductoRepository {

    async obtenerProductos(): Promise<Producto[]> {

        const { data, error } = await supabase
            .from("productos")
            .select("*");

        if (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }

        return data;
    }

    async agregarProducto(nombre: string, precio: number): Promise<Producto | null> {

        const { data, error } = await supabase
            .from("productos")
            .insert({
                nombre: nombre,
                precio: precio
            })
            .select()
            .single();

        if (error) {
            console.error("Error al agregar producto:", error);
            return null;
        }

        return data;
    }

    async eliminarProducto(id: number): Promise<void> {

        const { error } = await supabase
            .from("productos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    }
}