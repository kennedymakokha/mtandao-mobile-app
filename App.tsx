/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import "./global.css"
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Splashsreen from './src/screens/splashsreen';

function App(): React.JSX.Element {


  return (
    <Splashsreen />
  );
}



export default App;
