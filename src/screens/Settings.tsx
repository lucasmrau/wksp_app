import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {BatteryRange} from '../components/BatteryRange';

export function Settings() {
  return (
    <View className="bg-background flex-1">
      <View className='bg-modal m-5 rounded-md p-5'>
        <BatteryRange />
      </View>
    </View>
  );
}
