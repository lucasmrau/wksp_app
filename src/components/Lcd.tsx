import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-assets/slider';

interface LcdProps {
  lcdBrightness: number;
  onSliderChange: (value: number) => void;
  enable: boolean
}

export function Lcd({lcdBrightness, onSliderChange, enable}: LcdProps) {

  const handleSliderChange = (value: any) => {
    onSliderChange(value);
  };

  return (
    <>
      <View className="items-start flex-row rounded-md p-5 mt-2 space-x-5 mx-5 bg-modal flex ">
          <Text className="text-white px-2 pr-2 font-bold uppercase">display</Text>
          <Slider
            style={{width: 200, height: 20}}
            minimumValue={0}
            maximumValue={100}
            step={1}
            enabled={enable}
            thumbSize={8}
            thumbStyle={{
              display: 'none',
              position: 'absolute',
              // height: 38,
              // width:10,
              borderRadius: 0,
            }}
            trackStyle={{
              height: 25,
              borderRadius: 0,
            }}
            minimumTrackTintColor="#2b7bbb"
            thumbTintColor="#2b7bbb"
            value={lcdBrightness}
            onValueChange={handleSliderChange}
          />
        </View>
    </>
  );
}
