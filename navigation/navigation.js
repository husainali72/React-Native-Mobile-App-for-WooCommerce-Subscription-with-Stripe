import React from 'react';
import Portal from '../screens/portalScreen';
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
import { createStackNavigator } from 'react-navigation-stack';
import { Image, View, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';

const styles = {
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
};

const Header = (props) => {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('#fff');
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(false);
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Appbar.Header style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
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
      <StatusBar backgroundColor="white" barStyle="light-content" />
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


// const PortalStackNavigator = createStackNavigator(
//   {
//     PortalNavigator: Portal,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const HomeStackNavigator = createStackNavigator(
//   {
//     HomeNavigator: Home,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const PlansStackNavigator = createStackNavigator(
//   {
//     PlansNavigator: Plans,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const BehavioralStackNavigator = createStackNavigator(
//   {
//     BehavioralNavigator: Behavioral,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const MessageStackNavigator = createStackNavigator(
//   {
//     MessageNavigator: Message,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const AboutStackNavigator = createStackNavigator(
//   {
//     AboutNavigator: About,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const ContactStackNavigator = createStackNavigator(
//   {
//     ContactNavigator: Contact,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const CartStackNavigator = createStackNavigator(
//   {
//     CartNavigator: Cart,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <SecondHeader {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const CheckOutStackNavigator = createStackNavigator(
//   {
//     CheckOutNavigator: CheckOut,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <SecondHeader {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const ThankyouStackNavigator = createStackNavigator(
//   {
//     ThankyouNavigator: Thankyou,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <Header {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// const BillingStackNavigator = createStackNavigator(
//   {
//     BillingNavigator: Billing,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => {
//       return {
//         header: props => {
//           return <SecondHeader {...props} navigation={navigation} />;
//         },
//       };
//     },
//   },
// );

// export {
//   HomeStackNavigator,
//   PortalStackNavigator,
//   PlansStackNavigator,
//   BehavioralStackNavigator,
//   MessageStackNavigator,
//   AboutStackNavigator,
//   ContactStackNavigator,
//   CartStackNavigator,
//   CheckOutStackNavigator,
//   ThankyouStackNavigator,
//   BillingStackNavigator,
// };


//  export const Drawenavigation = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{ headerShown: false, unmountOnBlur: true }}
//       backBehavior={'initialRoute'}
//       detachInactiveScreens={true}
//       useLegacyImplementation={true}
//     // drawerContent={props => <DrawerContent {...props}  />}>
//     >

//       <Drawer.Screen
//         options={{
//           drawerLabel: 'Message',
//           header: props => {
//             return <Header {...props} navigation={navigation} />;
//           },
//         }}
//         component={Message}
//         name='Message' />
//       <Drawer.Screen
//         options={{
//           drawerLabel: 'About',
//           header: props => {
//             return <Header {...props} navigation={navigation} />;
//           },
//         }}
//         component={About}
//         name='About' />
//       <Drawer.Screen
//         options={{
//           drawerLabel: 'Contact',
//           header: props => {
//             return <Header {...props} navigation={navigation} />;
//           },
//         }}
//         component={Contact}
//         name='Contact' />
//       <Drawer.Screen
//         options={{
//           drawerLabel: 'Cart',
//           header: props => {
//             return <Header {...props} navigation={navigation} />;
//           },
//         }}
//         component={Cart}
//         name='Cart' />

//       <Drawer.Screen
//         options={{
//           drawerLabel: 'CheckOut',
//           header: props => {
//             return <SecondHeader {...props} navigation={navigation} />;
//           },
//         }}
//         component={CheckOut}
//         name='CheckOut' />

//       <Drawer.Screen
//         options={{
//           drawerLabel: 'Thankyou',
//           header: props => {
//             return <Header {...props} navigation={navigation} />;
//           },
//         }}
//         component={Thankyou}
//         name='Thankyou' />

//       <Drawer.Screen
//         options={{
//           drawerLabel: 'Billing',
//           header: props => {
//             return <SecondHeader {...props} navigation={navigation} />;
//           },
//         }}
//         component={Billing}
//         name='Billing' />
//     </Drawer.Navigator>
//   )
// }
//   )
// }