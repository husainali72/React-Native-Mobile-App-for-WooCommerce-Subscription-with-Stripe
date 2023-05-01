import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import AppSwitchNavigator from './navigation';
import OneSignal from 'react-native-onesignal';
import {NavigationContainer} from '@react-navigation/native';
// import Bugsee from 'react-native-bugsee';
import {Platform} from 'react-native';

const App = () => {
  // const launchBugsee = async () => {
  //   let appToken;
  //   if (Platform.OS === 'ios') {
  //     appToken = '<IOS-APP-TOKEN>';
  //   } else {
  //     appToken = 'eef42354-fd0a-44e6-a991-f0539b159f22';
  //   }

  //   await Bugsee.launch(appToken);
  // };
  useEffect(() => {
    // launchBugsee();
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('7f12797e-2f69-4366-9b75-dd627d4ef947');
    OneSignal.setRequiresUserPrivacyConsent(true);
    OneSignal.provideUserConsent(true);
    //END OneSignal Init Code

    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response);
    });
    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification);
    });
    setTimeout(() => {
      setDeviceId();
    }, 12000);
  }, []);
  const setDeviceId = async () => {
    const deviceState = await OneSignal.getDeviceState();
    // console.log('deviceState', deviceState)
  };
  return (
    <NavigationContainer>
      <AppSwitchNavigator />
    </NavigationContainer>
  );
};

export default App;
