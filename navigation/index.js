import React from 'react'
import { Image, View, StatusBar, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { DefaultTheme, Portal, Provider as PaperProvider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import Portals from '../screens/portalScreen';
import Home from '../screens/homeScreen';
import Plans from '../screens/plansScreen';
import Behavioral from '../screens/behavioralScreen';
import Message from '../screens/messageScreen';
import About from '../screens/aboutScreen';
import Contact from '../screens/contactScreen';
import Cart from '../screens/cartScreen';
import CheckOut from '../screens/checkoutScreen';
import Thankyou from '../screens/thankyouScreen';
import Billing from '../screens/billingScreen';
import WelcomeScreen from '../screens/welcomeScreen';
import SideMenu from './sideBar';


const AppSwitchNavigator = ({ }) => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
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
  const Header = props => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(false);
    }
    return (
      <>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Appbar.Header style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Image
                source={require('../assets/icons/menu-icon.png')}
                style={styles.headerBtnLeft}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerLogo}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Message')}>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Image
                source={require('../assets/icons/message-icon.png')}
                style={styles.headerBtnRight}
              />
            </View>
          </TouchableOpacity>
        </Appbar.Header>
      </>
    );
  };
  const SecondHeader = props => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(false);
    }
    return (
      <>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Appbar.Header style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Image
                source={require('../assets/icons/back-icon.png')}
                style={styles.headerBtnLeft}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerLogo}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Message')}>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Image
                source={require('../assets/icons/message-icon.png')}
                style={styles.headerBtnRight}
              />
            </View>
          </TouchableOpacity>
        </Appbar.Header>
      </>
    );
  };
  return (
    <PaperProvider theme={theme}>
      <Drawer.Navigator
        screenOptions={{ headerMode: "screen", swipeEnabled: false, }}
        backBehavior={'history'}
        drawerContent={props => <SideMenu {...props} />}>
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} />

        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }} />

        <Drawer.Screen
          name="Portal"
          component={Portals}
          options={{
            headerShown: true,
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }} />
        <Drawer.Screen
          name="Message"
          component={Message}
          options={{
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }}
        />

        <Drawer.Screen
          name="Plans"
          component={Plans}
          options={{
            headerShown: true,
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }} />

        <Drawer.Screen
          name="TelephonicBehavioralSupport"
          component={Behavioral}
          options={{
            headerShown: true,
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }} />

        <Drawer.Screen
          options={{
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }}
          component={About}
          name="AboutUs" />
        <Drawer.Screen
         component={Contact}
         name="ContactUs" 
          options={{
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }}
         />


        <Drawer.Screen
        component={Thankyou}
        name="ThankyouNavigator"
          options={{
            header: props => {
              return <Header {...props} navigation={navigation} />;
            },
          }}
           />
        <Drawer.Screen
           component={Cart}
           name="CartNavigator" 
          options={{
            header: props => {
              return <SecondHeader {...props} navigation={navigation} />;
            },
          }}
       />

        <Drawer.Screen
          component={CheckOut}
          name="CheckOutNavigator"
          options={{
            header: props => {
              return <SecondHeader {...props} navigation={navigation} />;
            },
          }}
         />
        <Drawer.Screen
         component={Billing}
         name="BillingNavigator" 
          options={{
            header: props => {
              return <SecondHeader {...props} navigation={navigation} />;
            },
          }}
         />
      </Drawer.Navigator>
    </PaperProvider>
  );

}

export default AppSwitchNavigator

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
  },
  headerLogo: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  logo: {
    flex: 1,
    height: 25,
    width: 150,
  },
  headerBtnRight: { width: 25, height: 25, marginRight: 10 },
  headerBtnLeft: { width: 20, height: 20, marginLeft: 10 },
});


