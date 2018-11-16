import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
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

  Logout(){
    var user = firebase.auth().currentUser;
    if(user){
      firebase.auth().signOut();
    }else{
      alert("User not logged in!");
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.title}>What is your email</Text>
      <TouchableOpacity
      style={styles.button1}
      onPress={this.Logout}
      >
      <Text style={styles.submitText}> Logout </Text>
      </TouchableOpacity>
      <Text> 1 </Text>
      </View>
    )
  }
}
