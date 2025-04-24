import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/splashsreen';
import "./global.css"
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { SearchProvider } from './src/context/searchContext';
import { RootStack } from './src/navigations/authStack.Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import { ModalProvider } from './src/context/modalContext';



const App = () => {
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState<boolean | null>(null);

  const getPermission = () => {
    Geolocation.requestAuthorization(
      () => {
        console.log('Permission granted');
      },
      (error: {
        code: number;
        message: string;
        PERMISSION_DENIED: number;
        POSITION_UNAVAILABLE: number;
        TIMEOUT: number;
      }) => {
        console.error('Permission denied:', error.message);
      }
    );
  };

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setFirstTime(true);
        await AsyncStorage.setItem('hasLaunched', 'true');
      } else {
        setFirstTime(false);
      }

      setTimeout(() => setLoading(false), 2000); // simulate splash delay
    };
    getPermission()
    checkFirstLaunch();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <ModalProvider>
      <MenuProvider>
        <SearchProvider>
          <NavigationContainer>
            <AuthProvider>
              <UserProvider>
                <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                    <RootStack firstTime={firstTime} />
                  </PersistGate>
                </Provider>
              </UserProvider>
            </AuthProvider>
          </NavigationContainer>
        </SearchProvider>
      </MenuProvider>
    </ModalProvider>
  );
};

export default App;
