import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export class AuthService {

    async registrar(email: string, password: string) {

        const { data, error } = await supabase.auth.signUp({email, password});

        if (error) {
            throw error;
        }

        return data;
    }

    async iniciarSesion(email: string, password: string) {

        const { data, error } = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            throw error;
        }

        return data;
    }

    async obtenerSesion() {

        const { data, error } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        return data.session;
    }

    async cerrarSesion() {

        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }
    }

    escucharCambios(callback: (session: Session | null) => void) {

        return supabase.auth.onAuthStateChange(
            (_event, session) => {
                callback(session);
            }
        );
    }
}

export const authService = new AuthService();