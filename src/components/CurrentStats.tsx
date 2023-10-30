import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function CurrentStats({
  acValue,
  dcValue,
  SetAcValue,
  SetDcValue,
  systemIsOn,
  onSystemPress,
  enable = false
}) {
  const [systemOnOff, setSystemOnOff] = useState(false);
  const [acOnOff, setAcOnOff] = useState(false); // Initialize with a number
  const [dcOnOff, setDcOnOff] = useState(false); // Initialize with a number
  // Function to handle the System button press
  const handleSystemPress = () => {
    // If the System is currently ON, turn it OFF and turn off AC and DC
    if (systemOnOff) {
      setSystemOnOff(false);
      onSystemPress(false);
      setAcOnOff(false);
      setDcOnOff(false);
    } else {
      // If the System is currently OFF, turn it ON
      setSystemOnOff(true);
      onSystemPress(systemIsOn === 1);
    }
  };

  // Function to handle the AC button press
  const handleACPress = () => {
    // Only allow turning on AC if the System is ON
    if (systemOnOff) {
      setAcOnOff(!acOnOff);
      SetAcValue(acValue);
    }
  };

  // Function to handle the DC button press
  const handleDCPress = () => {
    // Only allow turning on DC if the System is ON
    if (systemOnOff) {
      setDcOnOff(!dcOnOff);
      SetDcValue(dcValue);
    }
  };

  return (
    <View className="flex flex-row rounded-md justify-center items-center mb-2 mx-5 bg-modal p-5">
      <View>
        <TouchableOpacity
          className={`bg-${
            systemOnOff ? 'modal' : 'background'
          } flex justify-center mx-5 items-center w-16 h-16 rounded-full`}
          onPress={handleSystemPress}
          disabled={enable}>
          <Ionicons
            name="power-outline"
            size={35}
            color={systemOnOff ? '#2b7bbb' : 'grey'}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleACPress}
          className={`bg-${
            acOnOff ? 'modal' : 'background'
          } flex justify-center mx-5 items-center w-16 h-16 rounded-full`}
          disabled={!systemOnOff} // Disable the AC button if System is OFF
        >
          <Text
            className="uppercase font-bold text-xl"
            style={{color: acOnOff ? '#2b7bbb' : 'grey'}}>
            AC
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleDCPress}
          className={`bg-${
            dcOnOff ? 'modal' : 'background'
          } flex justify-center mx-5 items-center w-16 h-16 rounded-full`}
          disabled={!systemOnOff} // Disable the DC button if System is OFF
        >
          <Text
            className="uppercase font-bold text-xl"
            style={{color: dcOnOff ? '#2b7bbb' : 'grey'}}>
            DC
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
