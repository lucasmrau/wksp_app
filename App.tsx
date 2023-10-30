import {LogBox} from 'react-native';
import {Loading} from './src/components/Loading';
import React from 'react';
import {Routes} from './src/routes/index';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

export default function App() {

  return <Routes />;
}
