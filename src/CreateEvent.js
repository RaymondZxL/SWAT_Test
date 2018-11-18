import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

import styles from '../src/Styles'

const dismissKeyboard = require('dismissKeyboard')

export default class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {
			event: '',
			location: '',
		}
	}

	async setup(){
		var user = firebase.auth().currentUser;
		if(user != null){
			var numberOfEvents = 0;
			await firebase.database().ref('Events').once('value', function(snapshot){
				numberOfEvents = snapshot.val().NumberOfEvents.numberOfEvents;
			});



			await firebase.database().ref('Events/').child(numberOfEvents).set({
		        eventName: this.state.event,
		        location: this.state.location,
		        user: user.email
		    }).then((data)=>{
		        //success callback
		        console.log('data ' , data)
		    }).catch((error)=>{
		        //error callback
		        console.log('error ' , error)
		        return;
		    })
        var a;
        await firebase.database().ref('Events/').child(0).once('value', function(snapshot){
          a = snapshot.val().eventName;

        });

        alert(a);

		    numberOfEvents += 1;

		    await firebase.database().ref('Events').child('NumberOfEvents').set({numberOfEvents});

		    //await firebase.database().ref('Users').child(user.uid).child('listOfEvents').push({numberOfEvents-1});

		    
		}
	}

    render(){
      return(
        <TouchableWithoutFeedback behavior="padding" onPress={()=>{dismissKeyboard()}}>
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}> creating</Text>
          <Text style={styles.textBox}>Event:</Text>
        <TextInput
        maxLength={35}
        value={this.state.event}
        keyboardType = 'default'
        onChangeText={(event) => this.setState({ event })}
        placeholder='event'
        placeholderTextColor = 'gray'
        style={styles.input}
      />
        <Text>----------</Text>
        <Text style={styles.textBox}>location:</Text>
        <TextInput
        maxLength={35}
        value={this.state.location}
        keyboardType = 'default'
        onChangeText={(location) => this.setState({ location })}
        placeholder='location'
        placeholderTextColor = 'gray'
        style={styles.input}
      />
            <TouchableOpacity
        style={styles.button1}
        onPress={this.setup.bind(this)}
        >

        <Text style={styles.buttonText}> submit </Text>
      </TouchableOpacity>

        </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      )
    }  
}