import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import {createStackNavigator, NavigationActions} from 'react-navigation';
import firebase from 'react-native-firebase';

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
			firebase.auth().sendPasswordResetEmail(email).then(function() {
		        alert('Email Sent!');
		      }).catch(function(error) {
		        var errorCode = error.code;
		        var errorMessage = error.message;
		        if (errorCode == 'auth/invalid-email') {
		          alert(errorMessage);
		        } else if (errorCode == 'auth/user-not-found') {
		          alert(errorMessage);
		        }
		    });
			this.props.navigation.navigate('Login');
		}
	}

	render(){
		return(
			<KeyboardAvoidingView style={styles.container1} behavior="padding">
				<View style={styles.container1}>
					<Text style={styles.title}> Reset Password </Text>
					<TextInput
						maxLength={40}
          				value={this.state.email}
          				keyboardType = 'email-address'
						onChangeText={(email) => this.setState({ email })}
          				placeholder='example@ucsd.edu'
          				placeholderTextColor = 'gray'
          				style={styles.input}
          			/>

					<TouchableOpacity style={styles.button1} onPress={this.onSubmit.bind(this) }>
         				<Text style={styles.submitText}> Submit </Text>
       				</TouchableOpacity>

					<View style={{flexDirection: 'row'}}>
    					<Text style={{fontSize: 15}}>Just remembered?</Text>
						<TouchableOpacity onPress={() => {this.props.navigation.reset([NavigationActions.navigate({routeName:'Login'})], 0)}}>
    						<Text style={styles.buttonText1}>Sign in</Text>
        				</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}
