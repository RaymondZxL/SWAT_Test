import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ResponsiveImage from 'react-native-responsive-image';

import styles from '../src/Styles'
// import firebase from '../src/firebase'
import firebase from 'react-native-firebase'

export default class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: '',
			birthday: '',
			password: '',
			re_password: '',
		}
		this.firebaseRef = firebase.database().ref("User");
	}

	PushToFireBase(){
		this.firebaseRef.child(this.state.name).set({
			email: this.state.email,
			name: this.state.name,
			birthday: this.state.birthday,
			password: this.state.password});
			this.setState({
				email: '',
				name: '',
				birthday: '',
				// password: '',
				// re_password: '',
				interest: '',});
			}

			static navigationOptions = {
				title: 'Edit Profile',
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
					{/*user.email = this.state.email;
						user.name = this.state.name;
						user.birthday = this.state.birthday;
						user.password = this.state.password;*/}
						this.PushToFireBase();
						this.props.navigation.navigate('Home');
					}
				}

				render(){

					return(
						<KeyboardAvoidingView style={styles.container} behavior="padding">
						<ScrollView>
						<View style={styles.container}>
						<ResponsiveImage style={{height:150,width:150,margin:20}} source={require('../assets/Gary.jpg')}/>
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
						<Text style={styles.textBox }>Interest:</Text>
						<TextInput
						maxLength={100}
						value={this.state.birthday}
						keyboardType = 'default'
						onChangeText={(interest) => this.setState({ interest })}
						placeholder='eg. Movie, Music...'
						placeholderTextColor = 'gray'
						style={styles.input}
						/>
						</View>
						<TouchableOpacity
						style={styles.button1}
						onPress={this.onSubmit.bind(this)}
						>
						<Text style={styles.buttonText}> Save </Text>
						</TouchableOpacity>
						</View>
						</ScrollView>
						</KeyboardAvoidingView>
					)
				}
			}
