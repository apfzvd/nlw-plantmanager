import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import PlantSelect from '../screens/plant-select';
import ListSavedPlants from '../screens/list-saved-plants';
import { colors } from '../../styles';
import { MaterialIcons } from '@expo/vector-icons';

export default function AuthRoutes() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.heading,
      labelPosition: 'beside-icon',
      style: {
        height: 70,
      }
    }}>
      <Tab.Screen name="Nova Planta" component={PlantSelect} options={{
        tabBarIcon: ({ size, color }) => 
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
      }} />
      <Tab.Screen name="Minhas Plantas" component={ListSavedPlants} options={{
        tabBarIcon: ({ size, color }) => 
          <MaterialIcons name="format-list-bulleted" size={size} color={color} />
      }} />
    </Tab.Navigator>
  );
}