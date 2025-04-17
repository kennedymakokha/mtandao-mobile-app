import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './customDrawer';
import AdminDashboard from '../screens/vendor';



const Drawer = createDrawerNavigator();

export function RootDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerShadowVisible: false, // for iOS
                drawerStyle: {
                    backgroundColor: '#c6cbef',
                    width: 240,
                },
                headerStyle: {

                    elevation: 0, // for Android
                    shadowOpacity: 0, // also iOS
                    backgroundColor: 'transparent', // important for both
                },
                drawerType: 'slide',
            }}
        >
            <Drawer.Screen name="admin" component={AdminDashboard} />
            {/*<Drawer.Screen name="transactions" component={Transactions} /> */}
            {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
}