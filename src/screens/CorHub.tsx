import Carousel from 'react-native-reanimated-carousel';
import React, {useRef, useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BleManager, {
  Peripheral,
} from 'react-native-ble-manager';
import {useBle} from '../components/useBLE';
import {Alert} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {BatteryStats} from '../components/BatteryStats';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ConnectModal} from '../components/ConnectModal';
import {Led} from '../components/Led';
import {CurrentStats} from '../components/CurrentStats';
import {DetailsButton} from '../components/DetailsButton';
import {Lcd} from '../components/Lcd';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export function CorHub() {
  const [connected, setConnected] = useState(false); // change color battery icon
  const [isCarouselVisible, setIsCarouselVisible] = useState<boolean>(false); //visibility carousel
  const [connectionStatus, setConnectionStatus] = useState<
    'Connect' | 'Searching...' | 'Connecting' | 'Disconnecting' | 'Connected'
  >('Connect');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  ); // dots & color
  const [selectedPeripheral, setSelectedPeripheral] =
    useState<Peripheral | null>(null); // peripheral selected
  const [backButtonPressed, setBackButtonPressed] = useState(false);
  const [currentOnOff, setCurrentOnOff] = useState(false);

  const navigation = useNavigation();

  const {
    isScanning,
    peripherals,
    addOrUpdatePeripheral,
    startScan,
    handleStopScan,
    handleDisconnectedPeripheral,
    handleUpdateValueForCharacteristic,
    handleDiscoverPeripheral,
    retrieveConnected,
    connectPeripheral,
    disconnectPeripheral,
    togglePeripheralConnection,
    socExt1Value,
    socExt2Value,
    socExt3Value,
    socValue,
    powerValue,
    voltageValue,
    minTempValue,
    maxTempValue,
    bleManagerEmitter,
    readCharacteristicsonScreen,
    writelLEDToPeripheral,
    writelLCDToPeripheral,
    ledBrightness,
    setLedBrightness,
    LCDBrightness,
    setLCDBrightness,
    connectingStatus,
    setPowerValue,
    setSocValue,
    setConnectingStatus,
    acOnOff,
    dcOnOff,
    systemOnOff,
    setSystemOnOff,
    setAcOnOFF,
    setDcOnFF
  } = useBle();

  
  const openCarousel = async () => {
    try {
      const isEnabled = await BleManager.checkState();
      if (isEnabled === 'on') {
        setIsCarouselVisible(true);
        startScan();
      } else {
        Alert.alert(
          'Bluetooth is Off',
          'Please enable Bluetooth to connect to devices.',
        );
      }
    } catch (error) {
      console.error('Error enabling Bluetooth:', error);
      // Handle error if there was a problem checking Bluetooth state
    }
  };

  const hideCarousel = () => {
    setIsCarouselVisible(false);
    handleStopScan();
  };

  const connectDevice = async (peripheral: Peripheral, index: number) => {
    try {
      if (connectionStatus === 'Connect') {
        console.log('Connecting...');
        const isEnabled = await BleManager.checkState();
        if (isEnabled !== 'on') {
          console.log('Bluetooth is off. Not connecting.');
          Alert.alert(
            'Bluetooth is Off',
            'Please enable Bluetooth to connect to devices.',
          );
          return; // Exit the function if Bluetooth is off
        }

        setConnectionStatus('Connecting');
        setSelectedItemIndex(index);
        setSelectedPeripheral(peripheral); // Show DotIndicator when connecting

        await addOrUpdatePeripheral(peripheral.id, {
          ...peripheral,
          connecting: true,
        });

        await BleManager.connect(peripheral.id);
        console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

        console.log(peripheral.id)

        await addOrUpdatePeripheral(peripheral.id, {
          ...peripheral,
          connecting: false,
          connected: true,
        });

        const peripheralData = await BleManager.retrieveServices(peripheral.id);

        // connectPeripheral(peripheral);

        console.log('Connected');
        setConnected(true);
        setSelectedPeripheral(null); // Hide DotIndicator when connected
        setConnectionStatus('Connected');
      } else if (connectionStatus === 'Connected') {
        console.log('Disconnecting...');
        setSelectedPeripheral(peripheral); // Show DotIndicator when disconnecting
        setSelectedItemIndex(index);
        setConnectionStatus('Disconnecting');

        console.debug(`[connect][${peripheral.id}] disconnected.`);

        // disconnectPeripheral(peripheral);
        await addOrUpdatePeripheral(peripheral.id, {
          ...peripheral,
          connected: false,
        });

        await BleManager.disconnect(peripheral.id);

        setPowerValue(0);
        setSocValue(0);

        setTimeout(() => {
        setConnectionStatus('Connect');
        setConnected(false);
        setSelectedPeripheral(null); // Hide DotIndicator when fully disconnected
        }, 1000);
      }
    } catch (error: any) {
      console.error('Connection error:', error);
      if (error.message === 'Bluetooth is off') {
        Alert.alert(
          'Bluetooth is Off',
          'Please enable Bluetooth to connect to devices.',
        );
      } else {
        console.log('Disconnected due to connection failure');
        setConnectionStatus('Connect');
        setSelectedPeripheral(null);
      }
    }
  };

  useEffect(() => {
    if(systemOnOff){    
      readCharacteristicsonScreen()}
  }, [systemOnOff]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Define snap points for the bottom sheet modal
  const snapPoints = useMemo(() => ['60%', '60%'], []);

  // Callback to close the modal
  const closeModal = () => {
    bottomSheetModalRef.current?.close();
  };

  // Callback when modal is presented
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const updateLedBrightness = (ledBrightness: React.SetStateAction<number>) => {
    setLedBrightness(ledBrightness);
  };

  const updateLCDBrightness = (lcdBrightness: React.SetStateAction<number>) => {
    setLCDBrightness(lcdBrightness);
  };

  const updateACCurrent = () => {
    const updatedAcOnOff = acOnOff === 0 ? 1 : 0;
    setAcOnOFF(updatedAcOnOff);
  };
  
  const updateDCCurrent = () => {
    const updatedDcOnOff = dcOnOff === 0 ? 1 : 0;
    setDcOnFF(updatedDcOnOff);
  };
  
  const updateSystemCurrent = () => {
    setSystemOnOff(systemOnOff === 0 ? 1 : 0);
    setCurrentOnOff(currentOnOff === false ? true : false)
  };
  

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth * 0.5;

  const firstTwoDigits = Math.floor(socValue / 10);

  useEffect(() => {
    const handleBackPress = () => {
      if (connected) {
        // Option 'connect' is true, show an alert to disconnect
        Alert.alert(
          'Disconnect',
          'Please, disconnect your Cor Hub to continue.',
          [
            {
              text: 'Ok',
              onPress: () => {}, // Do nothing if the user cancels
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      } else {
        // Option 'connect' is not true, simply navigate back
        navigation.goBack();
      }
      return true; // Return true to indicate that we've handled the back press
    };
  
    // Add event listener for the Android back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  
    return () => {
      // Remove the event listener when the component unmounts
      backHandler.remove();
    };
  }, [connected, navigation]);

  return (
    <>
      <GestureHandlerRootView className="bg-background flex-1">
        <BottomSheetModalProvider>
          <View className="absolute top-5 left-3 flex pt-4 flex-row">
            <Text className=" text-white font-bold  text-xl">COR HUB</Text>
          </View>
          <View className="justify-center h-32 pt-4 mt-12 flex flex-row relative">
            {isCarouselVisible ? (
              <>
                {isScanning ? (
                  <View>
                    <ActivityIndicator
                      style={{paddingTop: 15, paddingBottom: 10}}
                      size="large"
                      color="#2b7bbb"
                    />
                    <Text className="text-white text-center justify-center pb-5">
                      Searching for COR HUB...
                    </Text>
                  </View>
                ) : (
                  <>
                    {peripherals.size > 0 ? (
                      peripherals.size === 1 ? ( // Check if there is only one item
                        <View className="flex flex-1 flex-col relative justify-center">
                          <View className="absolute right-7 top-5 z-30">
                            <TouchableOpacity
                              onPress={() => {
                                if(systemOnOff){
                                  readCharacteristicsonScreen();
                                }
                              }}>
                              <Ionicons name="sync" size={40} color="white" />
                            </TouchableOpacity>
                          </View>
                          <View
                            key={Array.from(peripherals)[0][1]}
                            className="items-center flex-grow">
                            {selectedPeripheral && (
                              <DotIndicator
                                color="white"
                                size={5}
                                style={{
                                  paddingBottom: 10,
                                  position: 'absolute',
                                  top: 8,
                                }}
                              />
                            )}
                            <TouchableOpacity
                              onPress={
                                () =>
                                  connectDevice(
                                    Array.from(peripherals)[0][1],
                                    0,
                                  ) // Pass the index as 0
                              }>
                              <MaterialCommunityIcons
                                name="battery"
                                size={40}
                                color={
                                  connected && selectedItemIndex === 0 // Set color based on selected item index
                                    ? '#2b7bbb'
                                    : 'gray'
                                }
                                style={{
                                  borderWidth: 1,
                                  borderColor: 'gray',
                                  borderRadius: 10,
                                  padding: 15,
                                }}
                              />
                            </TouchableOpacity>
                            <Text className="text-white">
                              {Array.from(peripherals)[0][1].name}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View className="flex flex-row">
                          <Carousel
                            data={Array.from(peripherals)}
                            renderItem={({item, index}) => (
                              <View
                                key={item[0]}
                                className="flex flex-1 items-center justify-center">
                                {selectedPeripheral &&
                                  selectedItemIndex === index &&
                                  (connectionStatus === 'Connecting' ||
                                    connectionStatus === 'Disconnecting') && (
                                    <DotIndicator
                                      color="white"
                                      size={5}
                                      style={{
                                        paddingBottom: 10,
                                        position: 'absolute',
                                        top: 8,
                                      }}
                                    />
                                  )}
                                <TouchableOpacity
                                  onPress={() => connectDevice(item[1], index)}>
                                  <MaterialCommunityIcons
                                    name="battery"
                                    size={40}
                                    color={
                                      connected && selectedItemIndex === index // Set color based on selected item index
                                        ? '#2b7bbb'
                                        : 'gray'
                                    }
                                    style={{
                                      borderWidth: 1,
                                      borderColor: 'gray',
                                      borderRadius: 10,
                                      padding: 15,
                                    }}
                                  />
                                  <Text className="text-white text-center">
                                    {item[1].name}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}
                            width={itemWidth}
                            mode="parallax"
                            height={itemWidth / 2}
                          />
                          <View className="">
                            <TouchableOpacity
                              className="p-5 absolute"
                              onPress={() => {
                                if(systemOnOff){
                                  readCharacteristicsonScreen();
                                }                           
                              }}>
                              <Ionicons name="sync" size={40} color="white" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    ) : (
                      <View className="flex">
                        <Text className="text-white mt-2 text-base">
                          Cor Hub not found. Try again.
                        </Text>
                        <TouchableOpacity
                          className="py-4 m-2 px-5 bg-button rounded-md"
                          onPress={openCarousel}>
                          <Text className="text-white font-bold text-center uppercase">
                            Connect
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </>
            ) : (
              <View className="justify-center">
                <TouchableOpacity
                  className="py-4 px-20 justify-center bg-button rounded-md"
                  onPress={openCarousel}>
                  <Text className="text-white font-bold uppercase">
                    Connect
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <BatteryStats powerValu={powerValue} soc={firstTwoDigits} />
          <CurrentStats
            acValue={acOnOff}
            dcValue={dcOnOff}
            systemIsOn={systemOnOff}
            SetAcValue={updateACCurrent}
            SetDcValue={updateDCCurrent}
            onSystemPress={updateSystemCurrent}
            enable={!connected}
          />
          <Led
            ledBrightness={ledBrightness}
            onSliderChange={updateLedBrightness}
            enable={currentOnOff}
            enableMode={!currentOnOff}
          />
          <Lcd
            lcdBrightness={LCDBrightness}
            onSliderChange={updateLCDBrightness}
            enable={currentOnOff}
          />
          <DetailsButton setModalVisible={handlePresentModalPress} />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            handleIndicatorStyle={{backgroundColor: 'grey'}}
            handleStyle={{
              backgroundColor: '#2C2C30',
              borderTopWidth: 5,
              borderTopColor: 'grey',
            }}
            backgroundStyle={{display: 'none'}}>
            <ConnectModal
              closeModal={closeModal}
              snapPoints={snapPoints}
              powerValu={powerValue}
            />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}

