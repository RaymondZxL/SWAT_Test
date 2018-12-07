import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Alert, Button, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import { createStackNavigator, StackNavigator, createBottomTabNavigator } from 'react-navigation';

import Login from './src/Login'
import NewUser from './src/NewUser'
import Password from './src/Password'
import Password2 from './src/Password2'
import BottomTab from './src/BottomTab'
import MyEvents from './src/MyEvents'
import ChangeProfile from './src/ChangeProfile'
import EventDetail from './src/Event_detail'
import CreateEvent from './src/CreateEvent'
import EventDetail_Host from './src/Event_detail_Hosting'
import ModifyEvent from './src/ModifyEvent'

let screen = Dimensions.get('window');


const App = createStackNavigator({
  Login: {screen: Login},
  NewUser: {screen: NewUser},
  Password: {screen: Password},
  Password2: {screen: Password2},
  BottomTab: {screen: BottomTab},
  MyEvents: {screen: MyEvents},
  ChangeProfile: {screen: ChangeProfile},
  EventDetail: {screen: EventDetail},
  CreateEvent: {screen: CreateEvent},
  EventDetail_Host:{screen: EventDetail_Host},
  ModifyEvent: {screen: ModifyEvent},
});

export default App;

export const Tabs = createBottomTabNavigator({
  'BottomTab': {
    screen: BottomTab,
    navigationOptions: {
      tabBarLabel: 'BottomTab',
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