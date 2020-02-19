import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
// import { createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';

import {
  HomeStackNavigator,
  PortalStackNavigator,
  PlansStackNavigator,
  BehavioralStackNavigator,
  MessageStackNavigator,
  AboutStackNavigator,
  ContactStackNavigator,
  CartStackNavigator,
  CheckOutStackNavigator,
  ThankyouStackNavigator,
  BillingStackNavigator,
} from './navigation';
import WelcomeScreen from '../screens/welcomeScreen';
import SideMenu from './sideBar';

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
    },
    Plans: {
      screen: PlansStackNavigator,
    },
    TelephonicBehavioralSupport: {
      screen: BehavioralStackNavigator,
    },
    Message: {
      screen: MessageStackNavigator,
    },
    AboutUs: {
      screen: AboutStackNavigator,
    },
    ContactUs: {
      screen: ContactStackNavigator,
    },
    Portal: {
      screen: PortalStackNavigator,
    },
    Cart: {
      screen: CartStackNavigator,
    },
    Checkout: {
      screen: CheckOutStackNavigator,
    },
    Thankyou: {
      screen: ThankyouStackNavigator,
    },
    Billing: {
      screen: BillingStackNavigator,
    },
  },
  {
    contentComponent: SideMenu,
  },
);

const AppSwitchNavigator = createAnimatedSwitchNavigator(
  {
    Dashboard: {screen: AppDrawerNavigator},
    Welcome: {screen: WelcomeScreen},
  },
  {
    initialRouteName: 'Welcome',
    backBehavior: 'order',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  },
);

export default AppSwitchNavigator;
