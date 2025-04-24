import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome5";
import { vendorStackParamList } from "../../types";
import VendorDashboard from "../screens/vendor";
import Businesses from "../screens/vendor/business";
import { TouchableOpacity } from "react-native";
import SearchBar from "../components/searchBar";
import { useModal } from "../context/modalContext";
import BusinessDetails from "../screens/vendor/business/businessDeatilpage";

const Stack = createNativeStackNavigator<vendorStackParamList>();
export function VendorStack() {
    const { isModalVisible, showModal, toggleModal, hideModal } = useModal();
    return (
        <Stack.Navigator screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="AdminDashboard" options={{
                headerShown: false,
            }} component={VendorDashboard} />

            <Stack.Screen name="Businesses"

                options={({ navigation }) => ({
                    title: "",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={showModal}
                            // onPress={() => navigation.navigate('Createbusiness')}
                            style={{ marginRight: 12 }}
                        >
                            <Icon name={`${!isModalVisible ? "plus" : "window-close"}`} size={18} color="#ffaa1d" />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <SearchBar title="products" />
                    ),
                })}
                component={Businesses} />
            <Stack.Screen name="BusinessDetails"
                options={({ route }: any) => {
                    return {
                        title: route.params.business.business_name
                    }
                }}
                component={BusinessDetails} />
            {/*  <Stack.Screen name="ProductsList"
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
                component={ProductsList} /> */}

        </Stack.Navigator>
    );
}


