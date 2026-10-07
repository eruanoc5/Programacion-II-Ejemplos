import { useState, useEffect } from "react";
import { Producto } from "../models/Producto";
import { ProductoServices } from "../services/ProductoServices";
import { authService } from "../services/AuthServices";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {

  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);
  
  const productoServices = new ProductoServices();
  
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {

    const cargarProductos = async () => {

        const productos = await productoServices.obtenerProductos();

        setProductos(productos);
    };

    cargarProductos();

  }, []);

 const agregarProducto = async () => {

    const producto = await productoServices.agregarProducto(
        nombreProducto,
        precioProducto
    );

    if (producto) {
        setProductos([...productos, producto]);

        setNombreProducto("");
        setPrecioProducto(0);
    }
};

const eliminarProducto = async (id: number) => {

    await productoServices.eliminarProducto(id);

    setProductos(
        productos.filter(producto => producto.id !== id)
    );
};

const cerrarSesion = async () => {

    try {

        await authService.cerrarSesion();

    } catch (error) {

        console.error(
            "Error al cerrar sesión:",
            error
        );
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>

      <Pressable
        onPress={cerrarSesion}
        style={styles.botonClose}
    >
        <Text style={styles.botonTexto}>
            Cerrar sesión
        </Text>
    </Pressable>

      <View style={styles.formulario}>
        <TextInput
          value={nombreProducto}
          onChangeText={setNombreProducto}
          placeholder="Nombre del producto"
          style={styles.input}
        />
        <TextInput
          value={precioProducto.toString()}
          onChangeText={(text) => setPrecioProducto(Number(text))}
          placeholder="Precio del producto"
          style={styles.input}
          keyboardType="numeric"
        />

        <Pressable
          onPress={agregarProducto}
          style={styles.boton}
        >
          <Text style={styles.botonTexto}>
            Agregar producto
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.producto}>
            <View>
              <Text style={styles.nombre}>
                {item.nombre}
              </Text>

              <Text>
                Q {item.precio}
              </Text>
            </View>

            <Pressable
              onPress={() => eliminarProducto(item.id)}
            >
              <Text style={styles.eliminar}>
                Eliminar
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  formulario: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  producto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },

  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },

  eliminar: {
    fontWeight: "bold",
  },

  boton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#007BFF",
  },

  botonClose: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "white",
  },

  botonTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
});