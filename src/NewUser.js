import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase'
import styles from '../src/Styles'

export default class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: '',
			birthday: '',
			password: '',
			re_password: '',
		}	}

	static navigationOptions = {
		title: 'Creating Account',
	};

	user = this.props.navigation.getParam('user', 'Error');

	onSubmit(){
		const reg = /^\w+([\.-]?\w+)*@ucsd.edu$/;
		const date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
		if(this.state.email === '' || this.state.name === '' || this.state.birthday === '' || this.state.password === '' || this.state.re_password === ''){
			alert('Entries Cannot Be Empty!');
		}else if (this.state.password != this.state.re_password){
			alert('Two Passwords Do Not Match!');
		}else if (reg.test(this.state.email) === false){
			alert('UCSD Email !!!');
		}else if (date_regex.test(this.state.birthday) === false){
			alert('Invalid Birthday!');
		}else{
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
		      	var errorCode = error.code;
		        var errorMessage = error.message;
		        if (errorCode == 'auth/weak-password') {
		          alert('The password is too weak.');
		        } else {
		          alert(errorMessage);
		        }
		    });

		    var i = 0;
        		while(i <= 8000000){
          		i++;
        	}
        	firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
		    });

			var i = 0;
        		while(i <= 8000000){
          		i++;
        	}

		    firebase.auth().onAuthStateChanged(user =>{
	          if(user){
	           	firebase.auth().currentUser.updateProfile({
		    		name: this.state.name,
		    		birthday: this.state.birthday
		    	}).then(function(){this.props.navigation.navigate('Home')}).catch(function(){});
	          }else{
	            alert("Something went wrong, try again later!");
	          }
	        });

	        this.props.navigation.navigate('Home')
		    
			//this.props.navigation.navigate('Home');
			}
		}

	render(){

		return(
			<KeyboardAvoidingView style={styles.container} behavior="padding">
			<ScrollView>
			<View style={styles.container}>
			<Text style={styles.title}> Registration </Text>
			<Image style={styles.avatar} source={require('../assets/Gary.jpg')}/>
			<View style={styles.contaierRow}>
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
			<Text style={styles.textBox}>Name:</Text>
			<TextInput
			maxLength={35}
			value={this.state.name}
			keyboardType = 'default'
			onChangeText={(name) => this.setState({ name })}
			placeholder='My Name'
			placeholderTextColor = 'gray'
			style={styles.input}
			/>
			<Text style={styles.textBox }>Date of Birth:</Text>
			<TextInput
			maxLength={35}
			value={this.state.birthday}
			keyboardType = 'default'
			onChangeText={(birthday) => this.setState({ birthday })}
			placeholder='MM/DD/YYYY'
			placeholderTextColor = 'gray'
			style={styles.input}
			/>
			<Text style={styles.textBox}>Password:</Text>
			<TextInput
			maxLength={35}
			secureTextEntry={true}
			value={this.state.password}
			keyboardType = 'default'
			onChangeText={(password) => this.setState({ password })}
			placeholder='example'
			placeholderTextColor = 'gray'
			style={styles.input}
			/>
			<Text style={styles.textBox}>Re-enter Password:</Text>
			<TextInput
			maxLength={35}
			secureTextEntry={true}
			value={this.state.re_password}
			keyboardType = 'default'
			onChangeText={(re_password) => this.setState({ re_password })}
			placeholder='example'
			placeholderTextColor = 'gray'
			style={styles.input}
			/>
			</View>
			<TouchableOpacity
			style={styles.button1}
			onPress={this.onSubmit.bind(this)}
			>
			<Text style={styles.submitText}> Submit </Text>
			</TouchableOpacity>
			</View>
			</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}
