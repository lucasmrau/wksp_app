import {NavigationContainer} from '@react-navigation/native';
import {AppRoutes} from './app.routes';
import React from 'react';
import {StackRoutes} from './stack.routes';
import {StatusBar, View} from 'react-native';

export function Routes() {
  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2C2C30"
          translucent
        />
        <StackRoutes />
      </NavigationContainer>
    </View>
  );
}
