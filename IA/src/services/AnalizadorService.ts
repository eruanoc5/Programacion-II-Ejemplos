import * as FileSystem from "expo-file-system/legacy";
import { supabase } from "../lib/supabase";

export class AnalizadorService {

    async analizarImagen(uri: string): Promise<string> {

        const imageBase64 =
            await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

        const extension = uri
            .split("?")[0]
            .split(".")
            .pop()
            ?.toLowerCase();

        const mimeType =
            extension === "png"
                ? "image/png"
                : extension === "webp"
                    ? "image/webp"
                    : "image/jpeg";

        const { data, error } =
            await supabase.functions.invoke(
                "analizar-imagen",
                {
                    body: {
                        imageBase64,
                        mimeType,
                    },
                }
            );

        if (error) {
            throw error;
        }

        if (!data?.analisis) {
            throw new Error(
                "El servicio no devolvió un análisis."
            );
        }

        return data.analisis;
    }
}

export const analizadorService =
    new AnalizadorService();
