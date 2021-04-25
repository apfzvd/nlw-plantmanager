import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import * as Notifications from 'expo-notifications';

import { SavedPlant } from './src/helpers/plant-storage';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    const subs = Notifications.addNotificationReceivedListener(
      async ({ request }) => {
        const data = request.content.data.plant as SavedPlant;
        console.log('data', data);
      }
    )

    return () => subs.remove();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return <Routes />;
}