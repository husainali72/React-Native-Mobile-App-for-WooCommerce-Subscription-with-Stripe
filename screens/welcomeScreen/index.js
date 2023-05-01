import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import {Button, Paragraph, withTheme} from 'react-native-paper';
import OneSignal from 'react-native-onesignal';

const WelcomeScreen = props => {
  const windowwidth = Dimensions.get('window').width;
  // useEffect(() => {
  //   OneSignal.addEventListener('opened', onOpened);
  //   return () => OneSignal.removeEventListener('opened', onOpened);
  // });

  const onOpened = openResult => {
    props.navigation.navigate('Message');
  };

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('rgba(0,0,0,0)');
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  }

  const {colors} = props.theme;
  const styles = StyleSheet.create({
    welcomeScreenWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      flex: 1,
    },
    innerwelcomeScreenWrapper: {
      padding: 25,
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 15,
    },
    logBtn: {
      margin: 10,
      borderRadius: 25,
      width: 135,
      backgroundColor: colors.secondary,
    },
    paragraph: {
      color: colors.light,
      fontSize: 16,
      lineHeight: 25,
      textAlign: 'center',
      width: windowwidth < 768 ? 'auto' : 275,
    },
    vector: {width: 275, height: 95, marginTop: 45},
    logo: {
      width: 275,
      height: 85,
      marginBottom: 20,
    },
  });
  return (
    <>
      <StatusBar />
      <ImageBackground
        source={require('../../assets/images/welcome-screen-BG.png')}
        style={styles.welcomeScreenWrapper}
        resizeMode={'cover'}>
        <View style={styles.innerwelcomeScreenWrapper}>
          <Image
            source={require('../../assets/images/light-logo.png')}
            style={styles.logo}
          />
          <View style={styles.row}>
            <Button
              mode="contained"
              onPress={() => props.navigation.navigate('Portal')}
              style={styles.logBtn}>
              Sign In
            </Button>
            <Button
              mode="contained"
              onPress={() => props.navigation.navigate('Home')}
              style={styles.logBtn}>
              Sign Up
            </Button>
          </View>
          <Paragraph style={styles.paragraph}>
            Everywhere.care works with Telehealth Professionals to ensure the
            best doctor experience possible for you.
          </Paragraph>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/stethoscope-vector.png')}
              style={styles.vector}
            />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default withTheme(WelcomeScreen);
