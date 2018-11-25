import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/AntDesign';
import ResponsiveImage from 'react-native-responsive-image';

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
        // <View style={styles.container}>

        //   <View style={styles.spacing}></View>
        //   <Text id='name'>{this.state.name}</Text>
        //   <Text>{this.state.email}</Text>
        //   <Text>{this.state.uid}</Text>
        //   <View style={styles.spacing}></View>

				// </View>
				<View style={styles.container}>
				<ScrollView>
					<View style={{flex: 1, background: 'center', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 30, marginRight: 30}}>
						<ResponsiveImage
							style={{height:150, width:150, margin:20}}
							source={require('../assets/Gary.jpg')}
						/>
						{/* <View style={styles.conta} */}
						<View>

						</View>
					</View>
				</ScrollView>
				<Icon
					color={this.state.value_color}
					onPress={()=>{this.state.value_color==='grey' ? this.setState({value_color:'#E3170D'}): this.setState({value_color:'grey'});
												this.props.para.navigation.navigate('ChangeProfile')}}
												name = {"edit"}
												size={35}
												style={{position:"absolute", bottom:30, right:30}}
				/>
				</View>
      )
    }  
}