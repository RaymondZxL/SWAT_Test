import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import styles from './Styles'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
        name: "",
        interests: [],
        accountCreationDate: 0
      }
    }
  }

  static navigationOptions = {
    headerLeft: null,
    title: 'SWAT',
  };

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.title}>What is your email</Text>
      </View>
    )
  }
}
