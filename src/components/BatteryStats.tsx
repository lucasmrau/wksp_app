import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PowerMain} from '../characteristics/PowerMain';
import {SOCMain} from '../characteristics/SOCMain';
import Ionicons from 'react-native-vector-icons/Ionicons';


export function BatteryStats({powerValu, soc} : any) {
  const [chargeMode, setChargeMode] = useState(false);
  const [chargeRamaining, setChargeRemaining] = useState<string>('0');

 
  const openCarousel = async () => {
    // You may need to call startScan here or add your logic
  };

  //Charge Mode
  const handleChargeMode = () => {
    setChargeMode(!chargeMode);
  };

  return (
    <View className="justify-center relative mb-2 flex flex-row">
      <View className="items-end absolute right-5 top-[-100]">
         </View>
      <View className="flex">
        <AnimatedCircularProgress
          size={200}
          width={25}
          fill={soc}
          tintColor="#2b7bbb"
          backgroundColor="#3d5875"
          arcSweepAngle={180}
          rotation={270}
          style={{height: 220 / 2}}>
          {fill => (
            <View>
              <Text className="text-white text-4xl pb-7 font-bold">{`${Math.round(
                fill,
              )}%`}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <Text className="text-white text-center font-bold">
          Remaining time: {chargeRamaining}min
        </Text>
      </View>
      <View className="pt-5">
        <Text className="px-7 py-3 flex-col">
          {chargeMode ? (
            <MaterialCommunityIcons
              name="battery-arrow-up"
              onPress={handleChargeMode}
              size={35}
              color="#0EF700"
            />
          ) : (
            <MaterialCommunityIcons
              name="battery-arrow-down"
              onPress={handleChargeMode}
              size={35}
              color="#ff3f3f"
            />
          )}
        </Text>
        <Text className="text-white items-center text-center font-bold uppercase">
          Power
        </Text>
        <Text className="text-white items-center text-center font-bold uppercase">
          {powerValu}W
        </Text>
      </View>
    </View>
  );
}
