import React from "react";
import { View, Pressable, Text } from "react-native";

export function Button() {
  return (
    <View className="w-full h-full justify-center items-center">
      <Pressable>
         <Text>Activate Bluetooth</Text>
      </Pressable>
         <Text></Text>
    </View>
  );
}
