import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { TagSelect } from "react-native-tag-select";
import ResponsiveImage from 'react-native-responsive-image';

const {width: WIDTH} = Dimensions.get('window');

const data = [
    { id: 1, label: 'Arts & Crafts'},
    { id: 2, label: 'Business & Tech'},
    { id: 3, label: 'Fairs & Festivals'},
    { id: 4, label: 'Food & Dining'},
    { id: 5, label: 'Dance'},
    { id: 6, label: "Gaming"},
    { id: 7, label: 'Music'},
    { id: 8, label: "Sports"},
    { id: 9, label: 'Study'},
    { id: 10, label: 'Other'},
];

//const {app} = firebase.storage();

export default class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			name: '',
			password: '',
			re_password: '',
			onOffPassword1: true,
			clicked1: false,
      onOffPassword2: true,
      clicked2: false,
			// avatarSource: null,
			tag: null
		}	
	}

	static navigationOptions = {
		title: 'Registration',
	};

	user = this.props.navigation.getParam('user', 'Error');

	async onSubmit() {
		const reg = /^\w+([\.-]?\w+)*@ucsd.edu$/;
		const date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
		if (this.state.email === '' || this.state.name === '' || this.state.password === '' || this.state.re_password === '') {
			alert('Entries Cannot Be Empty!');
			return
		} else if (this.state.password != this.state.re_password) {
			alert('Two Passwords Do Not Match!');
			return
		} else if (reg.test(this.state.email) === false) {
			alert('Please use your UCSD Email');
			return
		} else if (this.tag.totalSelected == 0) {
			// alert(JSON.stringify(this.tag.itemsSelected));
			alert('Please select at least one interest')
			return
		} else {
			await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
		      	var errorCode = error.code;
		        var errorMessage = error.message;
		        if (errorCode == 'auth/weak-password') {
							alert('The password is too weak.');
							return;
		        } else {
							alert(errorMessage);
							return;
		        }
		    });

        // 	await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
				// });
			if (!firebase.auth().currentUser) {
				return;
			}

      await firebase.auth().currentUser.updateProfile({
							displayName: this.state.name, 
           		email: this.state.email,
           	}).then(function() {
           	}).catch(function(error) {
							 alert(error.errorMessage);
							 return;
						 });
						 
			user = firebase.auth().currentUser;
			await firebase.database().ref('Users/').child(user.uid).set({
				name: this.state.name,
				email: this.state.email,
				uid: user.uid,
				ListOfEvents: [],
				ListOfFavorite: [],
				ListOfAttending: [],
				numberOfEvents: 0,
				interest:this.tag.itemsSelected,
		}).then((data)=>{
				//success callback
				alert('Account Created!');
				this.props.navigation.navigate('BottomTab');
				console.log('data ' , data)
		}).catch((error)=>{
				//error callback
				console.log('error ' , error)
		})
		}
	}

	onOffPassword1 = () => {
		if (this.state.clicked1 == false) {
			this.setState({onOffPassword1: false, clicked1: true})
		} else {
			this.setState({onOffPassword1: true, clicked1: false})
		}
	}

	onOffPassword2 = () => {
		if (this.state.clicked2 == false) {
        	this.setState({onOffPassword2: false, clicked2: true})
    	} else {
        	this.setState({onOffPassword2: true, clicked2: false})
    	}
	}

	myfun=()=>{

	}

	render() {
		return(
			<KeyboardAvoidingView style={styles.container1} behavior="padding">
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView>
						<View style={styles.container1}>
                            <ResponsiveImage
                                style={{height: 150, width: 150, margin: 20}}
                                source={require('../assets/profile.png')}
                            />

							<View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
								<Icon name={'ios-mail'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
								<TextInput
									style={styles.loginInput}
									maxLength={35}
									value={this.state.email}
									keyboardType = 'email-address'
									onChangeText={(email) => this.setState({ email })}
									placeholder='Email'
									placeholderTextColor = 'gray'
									borderBottomColor = 'gray'
									borderBottomWidth = {1}
								/>
							</View>

							<View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
								<Icon name={'ios-person'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
								<TextInput
									style={styles.loginInput}
									maxLength={35}
									value={this.state.name}
									keyboardType = 'default'
									onChangeText={(name) => this.setState({ name })}
									placeholder='Name'
									placeholderTextColor = 'gray'
									borderBottomColor = 'gray'
									borderBottomWidth = {1}
								/>
							</View>

							<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
								<Icon name={'ios-lock'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
								<TextInput
									style={styles.loginInput}
									maxLength={35}
									value={this.state.password}
									keyboardType = 'default'
									onChangeText={(password) => this.setState({ password })}
									placeholder={'Password'}
									secureTextEntry={this.state.onOffPassword1}
									placeholderTextColor = 'gray'
									borderBottomColor = 'gray'
									borderBottomWidth = {1}
								/>

								<TouchableOpacity style={styles.btnEyeReg} onPress={this.onOffPassword1.bind(this)}>
									<Icon name={this.state.clicked1 == false ? 'ios-eye' : 'ios-eye-off'} size={20}/>
								</TouchableOpacity>
							</View>

							<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
								<Icon name={'ios-lock'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
								<TextInput
									style={styles.loginInput}
									maxLength={35}
									value={this.state.re_password}
									keyboardType = 'default'
									onChangeText={(re_password) => this.setState({ re_password })}
									placeholder={'Confirm Password'}
									secureTextEntry={this.state.onOffPassword2}
									placeholderTextColor = 'gray'
									borderBottomColor = 'gray'
									borderBottomWidth = {1}
								/>

								<TouchableOpacity style={styles.btnEyeReg} onPress={this.onOffPassword2.bind(this)}>
									<Icon name={this.state.clicked2 == false ? 'ios-eye' : 'ios-eye-off'} size={20}/>
								</TouchableOpacity>
							</View>


							<View style={{flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
								<Icon name={'ios-bookmark'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
								<TextInput
									style={styles.loginInput}
									editable = {false}
									defaultValue={'Interest'}
									color = 'gray'
								/>
							</View>

							<TagSelect
								data = {data}
								itemStyleSelected = {{opacity: 0.5, backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1}}
								containerStyle = {{marginLeft: 60, marginRight: 50}}
								ref = {(tag)=>{this.tag = tag}}
							/>

							<TouchableOpacity style={styles.button1} onPress={this.onSubmit.bind(this)}>
								<Text style={styles.submitText}>Sign up</Text>
							</TouchableOpacity>

							<View style={{flexDirection: 'row'}}>
								<Text style={{fontSize: 15}}>Have an account?</Text>
    							<TouchableOpacity onPress={() => {this.props.navigation.reset([NavigationActions.navigate({routeName:'Login'})], 0)}}>
									<Text style={styles.buttonText1}>Sign in</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },

    loginInput: {
        width: WIDTH - 150,
        height: 45,
        fontSize: 16,
        paddingLeft: 10,
        marginHorizontal: 25,
    },

    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },

    buttonText1: {
        fontFamily: 'Avenir',
        fontSize: 15,
        flexDirection: 'row',
        fontWeight: 'bold',
        left: 5,
    },

    btnEyeReg: {
        opacity:0.5,
        position: 'absolute',
        flexDirection: 'row',
        right: WIDTH*0.04,
        top: 20,
    },

    button1: {
        alignItems: 'center',
        backgroundColor: '#cc0f0f',
        opacity: 0.7,
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 5,
        marginBottom: 10,
    },

    submitText: {
        fontFamily: 'Avenir',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
});