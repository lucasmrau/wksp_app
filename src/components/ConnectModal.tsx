import React, {useState, useEffect} from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useBle } from '../components/useBLE';

interface ConnectModalProps {
  closeModal: () => void;
  snapPoints: string[];
  powerValu: number
}


export function ConnectModal({ closeModal, snapPoints, powerValu }: ConnectModalProps) {

  const {
    isScanning,
    peripherals,
    addOrUpdatePeripheral,
    startScan,
    handleStopScan,
    handleDisconnectedPeripheral,
    handleUpdateValueForCharacteristic,
    handleDiscoverPeripheral,
    // togglePeripheralConnection,
    retrieveConnected,
    connectPeripheral,
    handleAndroidPermissions,
    socValue,
    socExt1Value,
    socExt2Value,
    socExt3Value,
    voltageValue,
    powerValue,
    setPowerValue,
    minTempValue,
    maxTempValue,
    ledBrightness,
    setLedBrightness,
    setLCDBrightness,
    LCDBrightness,
    disconnectPeripheral,
    readCharacteristicsonScreen,
    connectingStatus
  } = useBle();
  console.log('modal rendered')


  return (
    <>
      <View className="flex-1 px-5 bg-background">
        <View className="rounded-full">
          <Ionicons
            name="close"
            size={30}
            color="gray"
            onPress={closeModal}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
        <View>
          <Text className="text-white text-center">COR Hub</Text>
        </View>
        <View className="flex flex-row justify-center gap-2 p-5">
          <Text className="bg-modal  text-white rounded-md p-5">{powerValu}</Text>
          <Text className="bg-modal text-white rounded-md p-5">Volts: 42.4V</Text>
        </View>
        <View>
          <Text className="text-white text-center">Hot Swap</Text>
        </View>
        <View className="flex flex-row justify-center gap-2 p-5">
          <Text className="bg-modal text-white rounded-md p-5">Charge: 50%</Text>
          <Text className="bg-modal text-white rounded-md p-5">Power: 40.4W</Text>
        </View>
        <View className="flex flex-row justify-center gap-2 px-5">
          <Text className="bg-modal text-white rounded-md p-5">Temp: 27°C</Text>
          <Text className="bg-modal text-white rounded-md p-5">Volts: 42.8V</Text>
        </View>
      </View>
    </>
  );
}
