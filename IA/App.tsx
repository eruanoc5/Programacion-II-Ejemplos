import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

import AppNavigator from "./src/navigation/AppNavigator";
import { authService } from "./src/services/AuthServices";

export default function App() {

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {

        const cargarSesion = async () => {

            const session = await authService.obtenerSesion();

            setSession(session);
        };

        cargarSesion();

        const listener =
            authService.escucharCambios((session) => {

                setSession(session);
            });

        return () => {
            listener.data.subscription.unsubscribe();
        };

    }, []);

    return (
        <AppNavigator session={session} />
    );
}