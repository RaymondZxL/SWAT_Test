import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import styles from '../src/Styles'

export default class Password extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
			items:[]
		}


	}

	static navigationOptions = {
    title: 'SWAT',
    };


	onSubmit(){
		const { email } = this.state;
		var flag = 0;
		const reg = /^\w+([\.-]?\w+)*@ucsd.edu$/;
		if (reg.test(this.state.email) === false || this.state.email === ''){
			alert('Enter Your UCSD Email Address!');
		}
		else {
			const email = this.state.email;
			this.props.navigation.navigate('Password2', {email: email,});
		}
	}

	render(){
		return(
			<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.container}>
			<Text style={styles.title}> Resetting Password </Text>
			<TextInput
			maxLength={40}
          	value={this.state.email}
          	keyboardType = 'email-address'
          	onChangeText={(email) => this.setState({ email })}
          	placeholder='example@ucsd.edu'
          	placeholderTextColor = 'gray'
          	style={styles.input} />

			<TouchableOpacity
          	style={styles.button1}
          	onPress={this.onSubmit.bind(this) }
        	>
         	<Text style={styles.buttonText}> Submit </Text>
       		</TouchableOpacity>
			</View>
			</KeyboardAvoidingView>
		)
	}
}
