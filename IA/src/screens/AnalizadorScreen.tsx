import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { analizadorService } from "../services/AnalizadorService";

export default function AnalizadorScreen() {
  const [imagen, setImagen] =
    useState<string | null>(null);

  const [analisis, setAnalisis] = useState('');
  const [cargando, setCargando] = useState(false);

  async function seleccionarImagen() {
    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
      });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
      setAnalisis('');
    }
  }

  async function tomarFotografia() {
    const permiso =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert(
        'Permiso necesario',
        'Necesitamos permiso para utilizar la cámara.',
      );
      return;
    }

    const resultado =
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7,
      });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
      setAnalisis('');
    }
  }

async function analizarImagen() {
  if (!imagen) {
    Alert.alert(
      "Selecciona una imagen",
      "Primero elige o toma una fotografía."
    );
    return;
  }

  setCargando(true);
  setAnalisis("");

  try {
    const resultado =
      await analizadorService.analizarImagen(imagen);

    setAnalisis(resultado);
  } catch (error) {
    console.error("Error al analizar imagen:", error);

    Alert.alert(
      "Error",
      "No fue posible analizar la imagen. Inténtalo nuevamente."
    );
  } finally {
    setCargando(false);
  }
}

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>
        Analizador de imágenes
      </Text>

      <Text style={styles.subtitulo}>
        Selecciona una fotografía y descubre qué
        puede identificar la inteligencia artificial.
      </Text>

      {imagen ? (
        <Image
          source={{ uri: imagen }}
          style={styles.imagen}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.marcador}>
          <Text style={styles.icono}>📷</Text>
          <Text style={styles.textoMarcador}>
            Tu imagen aparecerá aquí
          </Text>
        </View>
      )}

      <Pressable
        style={styles.boton}
        onPress={seleccionarImagen}
      >
        <Text style={styles.textoBoton}>
          Elegir de la galería
        </Text>
      </Pressable>

      <Pressable
        style={styles.botonSecundario}
        onPress={tomarFotografia}
      >
        <Text style={styles.textoBoton}>
          Tomar fotografía
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.botonAnalizar,
          (!imagen || cargando) && styles.deshabilitado,
        ]}
        onPress={analizarImagen}
        disabled={!imagen || cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textoBoton}>
            Analizar imagen con IA
          </Text>
        )}
      </Pressable>

      {analisis !== '' && (
        <View style={styles.resultado}>
          <Text style={styles.tituloResultado}>
            Resultado del análisis
          </Text>
          <Text style={styles.textoResultado}>
            {analisis}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F7F8FA',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 23,
    marginBottom: 24,
  },
  marcador: {
    height: 240,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  icono: {
    fontSize: 48,
    marginBottom: 12,
  },
  textoMarcador: {
    fontSize: 15,
    color: '#64748B',
  },
  imagen: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  botonSecundario: {
    backgroundColor: '#475569',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  botonAnalizar: {
    backgroundColor: '#15803D',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  deshabilitado: {
    opacity: 0.45,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultado: {
    marginTop: 24,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  tituloResultado: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#172554',
  },
  textoResultado: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
});
