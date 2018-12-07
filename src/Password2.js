import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import styles from '../src/Styles'

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
	    title: 'SWAT',
    };

	render(){
		const {navigation} = this.props;
		const email = navigation.getParam('email', 'None')
		return(

			<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.container}>
			<Text style={styles.title}>Sent email to {email}</Text>
			<TouchableOpacity
          	style={styles.button1}
			onPress={() =>
              {
              	this.props.navigation.navigate('Login')}}
        	>
         	<Text style={styles.buttonText}> Go to main page </Text>
       		</TouchableOpacity>
			</View>
			</KeyboardAvoidingView>
		)
	}
}