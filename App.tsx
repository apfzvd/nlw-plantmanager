import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Welcome from './src/screens/welcome';
import UserIdentification from './src/screens/user-identification';
import Confirmation from './src/screens/confirmation';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return <Routes />;
}