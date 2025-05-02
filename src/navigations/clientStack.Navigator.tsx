import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { clientStackParamList } from "../../types";
import ClientDashboard from "../screens/vendor/business/businessDeatilpage";
import LandingPage from "../screens/client/homescreen";
import SearchBar from "../components/searchBar";
import ProductDetail from "../screens/client/productDetail";
import ClientMain from "../screens/client/clientMain";
import CustomHeader from "../components/customHeader";
import BusinessDetails from "../screens/client/business_detail";

const Stack = createNativeStackNavigator<clientStackParamList>();


export function ClientStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerShadowVisible: false,
            }} >
            <Stack.Screen name="clientMainArea"
                options={{
                    header: () => <CustomHeader title="Mtandao APP" />,

                }}
                component={ClientMain} />
            <Stack.Screen name="clientDashboard"
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                        <SearchBar title="products" />
                    ),
                })}
                component={LandingPage} />
            <Stack.Screen
                options={({ route }: any) => {
                    return {
                        title: route.params.product.product_name
                    }
                }}
                name="Product_detail" component={ProductDetail} />
            <Stack.Screen
                options={({ route }: any) => {
                    console.log(route)
                    return {
                        header: () => <CustomHeader title={`${route.params.business.business_name}`} />,
                        // title: 
                    }
                }}
                name="business_detail" component={BusinessDetails} />
        </Stack.Navigator>
    );
}




