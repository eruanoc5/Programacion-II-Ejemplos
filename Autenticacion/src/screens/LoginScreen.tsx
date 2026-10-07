import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { authService } from "../services/AuthServices";

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = async () => {

        try {

            await authService.iniciarSesion(
                email,
                password
            );

        } catch (error: any) {

            console.error("Error al iniciar sesión:", error);

            Alert.alert(
                "Error",
                error.message
            );
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Iniciar sesión
            </Text>

            <Text style={styles.descripcion}>
                Ingresa tus datos para continuar.
            </Text>

            <View style={styles.formulario}>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Correo electrónico"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                />

                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Contraseña"
                    secureTextEntry
                    style={styles.input}
                />

                <Pressable
                    onPress={iniciarSesion}
                    style={styles.boton}
                >
                    <Text style={styles.botonTexto}>
                        Iniciar sesión
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("Registro")}
                    style={styles.botonSecundario}
                >
                    <Text style={styles.botonSecundarioTexto}>
                        Crear cuenta
                    </Text>
                </Pressable>

            </View>

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
        marginBottom: 10,
    },

    descripcion: {
        fontSize: 16,
        marginBottom: 25,
    },

    formulario: {
        marginTop: 10,
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },

    boton: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#007BFF",
        marginTop: 5,
    },

    botonTexto: {
        fontSize: 16,
        fontWeight: "bold",
    },

    botonSecundario: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },

    botonSecundarioTexto: {
        fontSize: 16,
        fontWeight: "bold",
    },
});