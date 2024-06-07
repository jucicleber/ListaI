import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import NovaLista from "../pages/NovaLista";


export type StackParamsList = {
    Dashboard: undefined
    NovaLista: undefined
};

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            /> */}

            <Stack.Screen
                name="NovaLista"
                component={NovaLista}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppRoutes;