import React, { Component } from 'react';
import { Dimensions, Keyboard, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase'
import { TagSelect } from "react-native-tag-select";
import ResponsiveImage from 'react-native-responsive-image';

const { width:WIDTH } = Dimensions.get('window');

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

export default class ChangeProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: firebase.auth().currentUser.email,
			name: '',
			clicked1:false,
			clicked2:false,
			re_password: '',
			tag: null,
		}
		this.firebaseRef = firebase.database().ref("User");
	}

	static navigationOptions = 
		{
		  title: 'Change Profile',
		};
	  
	


	user = this.props.navigation.getParam('user', 'Error');

	async onSubmit(){
		const reg = /^\w+([\.-]?\w+)*@ucsd.edu$/;
		const date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
		var user = firebase.auth().currentUser;
		if (this.state.name === ''){
			alert('Entries Cannot Be Empty!');
		} else if (this.tag.totalSelected ==0){
			alert('Please select at least one interest');
		}
		else{
		firebase.database().ref('Users').child(user.uid).update({
			// email: this.state.email,
			name: this.state.name,
			interest:this.tag.itemsSelected
		}).then((data)=>{
				//success callback
			alert('Profile Changed!');
			this.props.navigation.state.params.onNavigateBack()
			this.props.navigation.goBack()
			// this.props.navigation.state.params.onNavigateBack();
			// this.props.navigation.navigate('Home');
		}).catch((error)=>{
				//error callback
				console.log('error ' , error)
		})
		}
			
		} 
	
	

		render(){
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
								value={this.state.email}
								borderBottomColor='gray'
								borderBottomWidth={1}
															/>
						</View>

						<View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
							<Icon name={'ios-person'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
							<TextInput
								style={styles.loginInput}
								maxLength={35}
								value={this.state.name}
								keyboardType='default'
								onChangeText={(name) => this.setState({ name })}
								placeholder='Name'
								placeholderTextColor='gray'
								borderBottomColor='gray'
								borderBottomWidth={1}
							/>
						</View>

						<View style={{flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
							<Icon name={'ios-bookmark'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
							<TextInput
								style={styles.loginInput}
								editable={false}
								defaultValue={'Interest'}
								color='gray'
							/>
						</View>

						<TagSelect
							data={data}
							itemStyleSelected={{opacity: 0.5, backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1}}
							containerStyle={{marginLeft: 60, marginRight: 50}}
							ref={(tag)=>{this.tag = tag}}
						/>

						<TouchableOpacity style={styles.button1} onPress={this.onSubmit.bind(this)}>
							<Text style={styles.submitText}>Save</Text>
						</TouchableOpacity>
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
						fontFamily: 'Avenir',
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