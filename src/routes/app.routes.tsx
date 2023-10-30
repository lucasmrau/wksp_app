import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons"
import MatterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { LogBox } from "react-native"; // ERROR CAUSED FOR NEW LIBRARIES
import { Loading } from "../components/Loading";
import { NativeWindStyleSheet } from "nativewind";
import React from "react";

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { HomePage } from '../screens/HomePage';
import { Store } from '../screens/Store';

NativeWindStyleSheet.setOutput({
  default: "native",
});

// import {
//   useFonts,
//   Roboto_400Regular,
//   Roboto_500Medium,
//   Roboto_700Bold,
//   Roboto_900Black,
// } from "@expo-google-fonts/roboto";
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export function AppRoutes() {
  const navigation = useNavigation();

  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_500Medium,
  //   Roboto_700Bold,
  //   Roboto_900Black,
  // });

  // if (!fontsLoaded) {
  //   return <Loading />;
  // }

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
       component={HomePage}
        name="Home"
        options={{
          title: "Home",
          tabBarActiveTintColor: "yellow",
          tabBarStyle: { backgroundColor: "#2C2C2C" },
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="StorePage"
        component={Store}
        options={{
          title: "Store",
          tabBarActiveTintColor: "yellow",
          tabBarStyle: { backgroundColor: "#2C2C2C" },
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}
