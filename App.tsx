import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStack } from './src/navigations/rootStack';
import SplashScreen from './src/screens/splashsreen';


import "./global.css"
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { SearchProvider } from './src/context/searchContext';




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
    <SearchProvider>
      <NavigationContainer>
        <UserProvider>
          <RootStack firstTime={firstTime} />
        </UserProvider>
      </NavigationContainer>
    </SearchProvider>
  );
};

export default App;
