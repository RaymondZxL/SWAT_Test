import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import styles from './Styles'
const dismissKeyboard = require('dismissKeyboard');

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        email: '',
        password: '',
        name: '',
        interests: [],
        birthday: '',
        re_password: '',
        accountCreationDate: 0
      },
      email: '',
      password: '',
      timePassed: false,

    }
  }

  static navigationOptions = {
    headerLeft: null,
    title: 'SWAT',
  };

  onLogin() {
    const { email, password } = this.state;
    if(this.state.email === '' || this.state.password === ''){
      alert('Empty!');
    }
    else {
      const reg = /^\w+([\.-]?\w+)*@ucsd.edu$/;
      if (reg.test(this.state.email) === false){
        alert('UCSD email !!!');
      }else{
        this.state.user.email = this.state.email;
        this.state.user.password = this.state.password;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
          var errorMeg = error.message;
          alert(errorMeg);
        });
      }
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container} behavior="position" onPress={()=>{dismissKeyboard()}}>
      <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/IMG_2197.jpg")}/>
      <Text style={styles.textBox}>Email:</Text>
      <TextInput
      maxLength={35}
      value={this.state.email}
      keyboardType = 'email-address'
      onChangeText={(email) => this.setState({ email })}
      placeholder='example@ucsd.edu'
      placeholderTextColor = 'gray'
      style={styles.input}
      />
      <Text style={styles.textBox}>Password:</Text>
      <TextInput
      maxLength={35}
      value={this.state.password}
      onChangeText={(password) => this.setState({ password })}
      placeholder={'example'}
      secureTextEntry={true}
      placeholderTextColor = 'gray'
      style={styles.input}
      />

      <TouchableOpacity
      style={styles.button1}
      onPress={this.onLogin.bind(this) }
      >
      <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button1}
      onPress={() =>
      {this.props.navigation.navigate('NewUser')}}
      >
      <Text style={styles.buttonText}> New User? </Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button1}
      onPress={() =>
        {this.props.navigation.navigate('Password')}}
      >

      <Text style={styles.buttonText}> Forgot Password? </Text>
      </TouchableOpacity>

      </View>

      </TouchableWithoutFeedback>
        );
      }
    }
