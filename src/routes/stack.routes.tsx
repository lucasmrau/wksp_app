// stack.routes.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppRoutes} from './app.routes';
import {CorHub} from '../screens/CorHub';
import {Batteries} from '../screens/Batteries';
import { Settings } from '../screens/Settings';
import { Statistics } from '../screens/Statistics';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
      }}>
      <Stack.Screen
        name="HomeP"
        component={AppRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CorHub"
        component={CorHub}
             options={{headerShown: false}}
        // options={{
        //   headerTitle: 'COR HUB',
        //   headerStyle: {
        //     backgroundColor: '#2C2C30',
        //   },
        //   headerTintColor: 'white',
        // }} 
      />
      <Stack.Screen
        name="Batteries"
        component={Batteries}
        options={{headerShown: false}}
        // options={{
        //   headerTitle: 'Batteries',
        //   headerStyle: {
        //     backgroundColor: '#2C2C30',
        //   },
        //   headerTintColor: 'white',
        // }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
          headerStyle: {
            backgroundColor: '#2C2C30',
          },
          headerTintColor: 'white',
        }}
      />

<Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{
          headerTitle: 'Statistics',
          headerStyle: {
            backgroundColor: '#2C2C30',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}
