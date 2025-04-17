import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AdminStackParamList } from "../../types";
import AdminDashbiard from "../screens/vendor";
// const Stack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<AdminStackParamList>();


export function adminStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="admin" options={{
                headerShown: false,
            }} component={AdminDashbiard} />


        </Stack.Navigator>
    );
}





