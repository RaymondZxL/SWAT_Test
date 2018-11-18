import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import styles from '../src/Styles'

export default class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			birthday: '',
			email: '',
			uid: '',
		}
		this.setup();
	}

	async setup(){
		var user = firebase.auth().currentUser;
		if(user != null){
			this.state.name = user.displayName;
			this.state.birthday = user.birthday;
			this.state.email = user.email;
			this.state.uid = user.uid;
			
		}
	}

    render(){
      return(
        <View style={styles.container}>

          <View style={styles.spacing}></View>
          <Text id='name'>{this.state.name}</Text>
          <Text>{this.state.email}</Text>
          <Text>{this.state.uid}</Text>
          <View style={styles.spacing}></View>

        </View>
      )
    }  
}