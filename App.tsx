import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStack } from './src/navigations/rootStack';
import SplashScreen from './src/screens/splashsreen';
import { RootStackParamList } from './types';

import "./global.css"


const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState<boolean | null>(null);

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

    checkFirstLaunch();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <RootStack firstTime={firstTime} />
    </NavigationContainer>
  );
};

export default App;
