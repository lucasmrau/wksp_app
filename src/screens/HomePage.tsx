import { Text, TouchableOpacity, View,  Platform,
  PermissionsAndroid, } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useBle} from '../components/useBLE';

export function HomePage() {
  const navigation = useNavigation(); // Use the useNavigation hook

  useEffect(()=>{
    handleAndroidPermissions()
  },[])

  const handleAndroidPermissions = () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (result) {
          // console.debug(
          //   '[handleAndroidPermissions] User accepts runtime permissions android 12+',
          // );
        } else {
          // console.error(
          //   '[handleAndroidPermissions] User refuses runtime permissions android 12+',
          // );
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(checkResult => {
        if (checkResult) {
          // console.debug(
          //   '[handleAndroidPermissions] runtime permission Android <12 already OK',
          // );
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult) {
              // console.debug(
              //   '[handleAndroidPermissions] User accepts runtime permission android <12',
              // );
            } else {
              // console.error(
              //   '[handleAndroidPermissions] User refuses runtime permission android <12',
              // );
            }
          });
        }
      });
    }
  };

  function handleOpenCORHub() {
    navigation.navigate('CorHub' as never); 
  }

  function handleBatteryPage() {
    navigation.navigate('Batteries' as never); 
  }

  return (
      <View className="flex-1 flex-col items-center justify-center w-screen space-y-5 bg-background">
        <TouchableOpacity onPress={handleOpenCORHub}>
          <View className="bg-modal rounded-md items-center justify-center w-32 h-32">
            <MaterialCommunityIcons name='power-plug' size={30} color='gray'/>
            <Text className='text-white font-bold'>COR HUB</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBatteryPage}>
          <View className="bg-modal rounded-md items-center justify-center w-32 h-32">
            <MaterialCommunityIcons name='battery' size={30} color='gray'/>
            <Text className='text-white font-bold'>COR BATTERY</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="bg-modal rounded-md items-center justify-center w-32 h-32">
            <MaterialCommunityIcons name='sun-snowflake' size={30} color='gray'/>
            <Text className='text-white font-bold'>MPPT</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}
