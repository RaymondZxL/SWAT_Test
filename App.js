import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Alert, Button, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import { createStackNavigator, StackNavigator, createBottomTabNavigator } from 'react-navigation';

import Main from './src/Main'
import NewUser from './src/NewUser'
import Password from './src/Password'
import Password2 from './src/Password2'
import Home from './src/Home'
import Login from './src/Login'
import MyEvents from './src/MyEvents'
import ChangeProfile from './src/ChangeProfile'
import EventDetail from './src/Event_detail'


let screen = Dimensions.get('window');


const App = createStackNavigator({
  Main: {screen: Main},
  NewUser: {screen: NewUser},
  Password: {screen: Password},
  Password2: {screen: Password2},
  Home: {screen: Home},
  temp: {screen: Login},
  MyEvents: {screen: MyEvents},
  ChangeProfile: {screen: ChangeProfile},
  EventDetail: {screen: EventDetail},
});

export default App;

export const Tabs = createBottomTabNavigator({
  'Home': {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" type="entypo" size={28} color={tintColor} />
    },
  },
});

export const createRootNavigator = () => {
  return StackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
  );
};