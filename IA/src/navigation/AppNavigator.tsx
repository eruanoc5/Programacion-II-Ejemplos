import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AnalizadorScreen from "../screens/AnalizadorScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ session }: any) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!session ? (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />

                        <Stack.Screen
                            name="Registro"
                            component={RegisterScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Analizador"
                            component={AnalizadorScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
