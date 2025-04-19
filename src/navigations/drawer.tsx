import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './customDrawer';
import AdminDashboard from '../screens/vendor';
import { useUser } from '../context/UserContext';
import HomeScreen from '../screens/homescreen';
import SearchBar from '../components/searchBar';
const Drawer = createDrawerNavigator();
export function RootDrawer() {
    const { user, setUser, logout } = useUser();
    
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
                options={({ navigation }) => ({
                    title: "My businesses",
                    headerRight: () => (
                        <SearchBar title="products" />
                    ),
                })}
                name="admindashboad" component={user?.role !== "admin" ? HomeScreen : AdminDashboard} />
            {/*<Drawer.Screen name="transactions" component={Transactions} /> */}
            {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
}