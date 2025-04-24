import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './customDrawer';
import AdminDashboard from '../screens/vendor';
import { useUser } from '../context/UserContext';
import HomeScreen from '../screens/client/homescreen';
import SearchBar from '../components/searchBar';
import LoginScreen from '../screens/login';
import { VendorStack } from './vendorStack.Navigator';
import { ClientStack } from './clientStack.Navigator';
import { AdminStack } from './adminStack';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
const Drawer = createDrawerNavigator();
export function RootDrawer() {
    const { user } = useSelector((state: any) => state.auth)
    const { token } = useAuth();
    console.log(user, "USER")
    const getMainStack = () => {
        if (!token) return LoginScreen; // or null
        if (user?.role === 'client') return ClientStack;
        if (user?.role === 'superAdmin' || user?.role === 'sale') return AdminStack;
        if (user?.role === 'admin') return VendorStack;
        return LoginScreen;
    };

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',

                drawerStyle: {
                    backgroundColor: '#c6cbef',
                    width: 240,
                },
                headerStyle: {

                    elevation: 0, // for Android

                    backgroundColor: 'transparent', // important for both
                },
                drawerType: 'slide',
            }}
        >
            <Drawer.Screen
                options={{
                    headerShown: false
                }}
                name="Admindashboard" component={getMainStack()} />
            {/*<Drawer.Screen name="transactions" component={Transactions} /> */}
            {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
}