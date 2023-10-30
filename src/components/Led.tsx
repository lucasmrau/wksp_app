import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-assets/slider';
import {useBle} from './useBLE';

interface LcdProps {
  ledBrightness: number;
  onSliderChange: (value: number) => void;
  enable: boolean,
  enableMode: boolean
}

export function Led({ledBrightness, onSliderChange, enable, enableMode}: LcdProps) {
  const [modeIsPressed, modeDetIsPressed] = useState(false);

  const handleModePress = () => {
    modeDetIsPressed(!modeIsPressed);
  };

  const handleSliderChange = (value: any) => {
    onSliderChange(value); // Call the parent component's onSliderChange function
  };

  return (
    <>
      <View className="rounded-md flex flex-row mx-5 bg-modal bg-opacity-10 p-5">
        <View className="">
          <Text className="text-white pb-3 pl-1 font-bold uppercase">side LED</Text>
          <TouchableOpacity
            className={`bg-${
              modeIsPressed ? 'yellow' : 'background'
            } flex justify-center items-center w-16 h-16 rounded-full`}
            disabled={enableMode}
             onPress={handleModePress}
            >
            <Ionicons
              name="sunny-outline"
              size={35}
              color={modeIsPressed ? 'yellow' : 'grey'}
            />
          </TouchableOpacity>
        </View>
        <View className="justify-center items-center text-center flex flex-row px-7">
          <View>
            <Slider
              style={{width: 200}}
              minimumValue={0}
              maximumValue={40}
              step={1}
              thumbSize={20}
              thumbStyle={{
                display: 'none',
                // height: 38,
                // width:10,
                // borderRadius: 0,
              }}
              trackStyle={{
                height: 25,
                borderRadius: 0,
              }}
              minimumTrackTintColor="#2b7bbb"
              thumbTintColor="grey"
              value={ledBrightness}
              onValueChange={handleSliderChange}
              enabled={enable}
            />
          </View>
        </View>
      </View>
    </>
  );
}
