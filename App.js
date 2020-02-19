/**
 * The React Native App
 * https://github.com/husainali72/React-Native-Android-and-IOS-App
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import AppSwitchNavigator from './navigation';
import OneSignal from 'react-native-onesignal';
import {oneSignalAppId} from './services/config';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0DAA4C',
    accent: '#0DAA4C',
    light: '#fff',
    secondary: '#042450',
  },
};

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.init(oneSignalAppId);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  onReceived(notification) {
    //console.log('Notification received: ', notification);
  }
  onIds(device) {
    //console.log('Device info: ', device);
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
