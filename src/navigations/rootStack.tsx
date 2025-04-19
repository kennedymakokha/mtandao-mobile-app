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
import { AdminStack } from "./adminStack";
import LoginScreen from "../screens/auth";
import { RootDrawer } from "./drawer";
import { truncate } from "../utils/trancate";

const Stack = createNativeStackNavigator<RootStackParamList>();


function ProductStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerShadowVisible: false,
            }} >
            <Stack.Screen name="Auth" options={{
                headerShown: false,
            }} component={Auth} />
            <Stack.Screen name="Onboarding" options={{
                headerShown: false,
            }} component={OnboardingScreen} />
            <Stack.Screen name="Home"
                options={({ navigation }) => ({
                    title: 'Dashboard',
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
                headerShown: false
            }} component={AdminStack} />

        </Stack.Navigator>
    );
}

export function RootStack(firstTime: any) {
    return (
        <Stack.Navigator  screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
        }}>
            <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Splash"
                component={firstTime ? OnboardingScreen : LoginScreen}  // This holds your "Dashboard" as a nested screen
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Auth"
                component={LoginScreen}  // This holds your "Dashboard" as a nested screen
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Dashboard"
                component={RootDrawer}  // This holds your "Dashboard" as a nested screen
            />
            <Stack.Screen name="Product_detail"
                options={({ route, navigation }: any) => {
                    console.log(route)
                    return {
                        title: `${truncate(route.params.product.name, 20)}`,

                    }
                }}
                component={ProductDetail} />

        </Stack.Navigator>
    );
}



