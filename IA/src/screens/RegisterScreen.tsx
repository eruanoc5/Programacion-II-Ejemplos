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

export default function RegisterScreen({ navigation }: any) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registrar = async () => {

        try {

            await authService.registrar(
                email,
                password
            );

            Alert.alert(
                "Registro exitoso",
                "La cuenta fue creada correctamente.",
                [
                    {
                        text: "Aceptar",
                        onPress: () => navigation.goBack(),
                    },
                ]
            );

        } catch (error) {

            console.error(error);

            Alert.alert(
                "Error",
                "No fue posible crear la cuenta."
            );
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Crear cuenta
            </Text>

            <Text style={styles.descripcion}>
                Regístrate para comenzar a utilizar la aplicación.
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
                    onPress={registrar}
                    style={styles.boton}
                >
                    <Text style={styles.botonTexto}>
                        Registrar
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.botonSecundario}
                >
                    <Text style={styles.botonSecundarioTexto}>
                        Volver al login
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