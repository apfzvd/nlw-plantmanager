import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import AuthRoutes from './tab-routes';

import Welcome from '../screens/welcome';
import UserIdentification from '../screens/user-identification';
import Confirmation from '../screens/confirmation';
import SavePlant from '../screens/save-plant';

function StackRoutes() {
  return (
    <Stack.Navigator
        headerMode="none"
        initialRouteName="Welcome"
    >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="UserIdentification" component={UserIdentification} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="PlantSelect" component={AuthRoutes} />
        <Stack.Screen name="SavePlant" component={SavePlant} />
        <Stack.Screen name="ListSavedPlants" component={AuthRoutes} />
    </Stack.Navigator>
  );
}

export default StackRoutes;