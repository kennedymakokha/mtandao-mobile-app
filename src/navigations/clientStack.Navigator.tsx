import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { clientStackParamList } from "../../types";
import ClientDashboard from "../screens/vendor/business/businessDeatilpage";
import LandingPage from "../screens/client/homescreen";
import SearchBar from "../components/searchBar";

const Stack = createNativeStackNavigator<clientStackParamList>();


export function ClientStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerShadowVisible: false,
            }} >
            <Stack.Screen name="clientDashboard"
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                        <SearchBar title="products" />
                    ),
                })}
                component={LandingPage} />
            {/* <Stack.Screen
                options={({ route }: any) => ({
                    title: route.params.product.name

                })}
                name="Product_detail" component={ProductDetailScreen} /> */}
            {/* <Stack.Screen name="AddProduct" options={{
                title: "Add Product"
            }} component={AddProductScreen} />
            <Stack.Screen name="admin" options={{
                headerShown: false
            }} component={AdminStack} /> */}

        </Stack.Navigator>
    );
}




