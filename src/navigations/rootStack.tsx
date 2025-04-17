import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/onBoardingScreen";
import HomeScreen from "../screens/homescreen";
import ProductDetail from "../screens/productDetail";
import { RootStackParamList } from "../../types";
import ProductDetailScreen from "../screens/productDetail";
import { Button, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import AddProductScreen from "../screens/addProduct";
import Auth from "../screens/auth";
import { adminStack } from "./adminStack";
// const Stack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();


function ProductStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Auth" options={{
                headerShown: false,
            }} component={Auth} />
            <Stack.Screen name="Home"
                options={({ navigation }) => ({
                    title: 'Dashboard',

                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddProduct')}
                            style={{ marginRight: 12 }}
                        >
                            <Icon name="plus" size={18} color="#900" />
                        </TouchableOpacity>
                    ),
                })}
                component={HomeScreen} />
            <Stack.Screen
                options={({ route }: any) => ({
                    title: route.params.product.name

                })}
                name="Product_detail" component={ProductDetailScreen} />
            <Stack.Screen name="AddProduct" options={{
                title: "Add Product"
            }} component={AddProductScreen} />
            <Stack.Screen name="admin" options={{

            }} component={adminStack} />

        </Stack.Navigator>
    );
}



export function RootStack(firstTime: any) {
    return (
        <Stack.Navigator screenOptions={{}}>
            {!firstTime ? (
                <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={OnboardingScreen} />
            ) : (
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Dashboard" // Directly navigating to Dashboard here
                    component={ProductStack}  // This holds your "Dashboard" as a nested screen
                />
            )}
        </Stack.Navigator>
    );
}



