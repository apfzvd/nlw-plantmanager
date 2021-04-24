import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Welcome from '../screens/welcome';
import UserIdentification from '../screens/user-identification';
import Confirmation from '../screens/confirmation';
import PlantSelect from '../screens/plant-select';

function StackRoutes() {
  return (
    <Stack.Navigator
        headerMode="none"
        initialRouteName="Welcome"
    >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="UserIdentification" component={UserIdentification} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="PlantSelect" component={PlantSelect} />
    </Stack.Navigator>
  );
}

export default StackRoutes;