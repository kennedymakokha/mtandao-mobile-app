import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AdminStackParamList } from "../../types";

import { RootDrawer } from "./drawer";
import BusinesScreen from "../screens/vendor/business";
import ProductsList from "../screens/vendor/business/products";
import { truncate } from "../utils/trancate";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import CreateBusiness from "../screens/vendor/business/createBusiness";
const Stack = createNativeStackNavigator<AdminStackParamList>();


export function AdminStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="adminDrawer" options={{
                headerShown: false,
            }} component={RootDrawer} />
            <Stack.Screen name="Createbusiness" options={{
                // headerShown: false,
                title: "Add Business"
            }} component={CreateBusiness} />
            <Stack.Screen name="Businesses"
                options={({ navigation }) => ({
                    title: "My businesses",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Createbusiness')}
                            style={{ marginRight: 12 }}
                        >
                            <Icon name="plus" size={18} color="#ffaa1d" />
                        </TouchableOpacity>
                    ),
                })}
                component={BusinesScreen} />
            <Stack.Screen name="BusinessesDetails"
                options={({ route }: any) => {
                    return {
                        title: route.params.item.name
                    }
                }}
                component={BusinesScreen} />
            <Stack.Screen name="ProductsList"
                options={({ route, navigation }: any) => {
                    return {
                        title: `${truncate(route.params.item.name, 10)}'s Products`,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddProduct')}
                                style={{ marginRight: 12 }}
                            >
                                <Icon name="plus" size={18} color="#ffaa1d" />
                            </TouchableOpacity>
                        ),
                    }
                }}
                component={ProductsList} />

        </Stack.Navigator>
    );
}





