import React, { Component } from 'react';
import {ScrollView, View, FlatList, Alert, Button, Text, TouchableOpacity, TextInput, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CardList from '../src/CardList';

import styles from '../src/Styles'

const dismissKeyboard = require('dismissKeyboard')

export default class MyEvent extends Component{
	constructor(props){
		super(props);
		this.state = {
			event: '',
			location: '',
      obj: '',
      buffer: []
		}
    //this.setup();

	}



  componentDidMount(){
    this.setup();
  }
	async setup(){
		var user = firebase.auth().currentUser;
		if(user != null){
			var numberOfEvents = 0;
			await firebase.database().ref('Events').once('value', function(snapshot){
				numberOfEvents = snapshot.val().NumberOfEvents.numberOfEvents;
			});

      for (var i = 0; i < numberOfEvents; i++){
        await firebase.database().ref('Events/').child(i).once('value',function(snapshot){
          //if(user.email === snapshot.val().user ){
            this.setState({event:snapshot.val().eventName});
            this.setState({location:snapshot.val().location});
            this.state.buffer.push({
              key: this.state.event,
              desc: this.state.location,
              nav: 'temp'
            },);
          //}
        }.bind(this));
      }

      this.setState({obj:'sdasd'});
		}
	}



    render(){
      const {navigation} = this.props.para
      return(
      //   <TouchableWithoutFeedback behavior="padding" onPress={()=>{dismissKeyboard()}}>
      //   <ScrollView>
      //   <View style={styles.container}>
      //   <FlatList
      //     directionalLockEnabled={true}
      //     ItemSeparatorComponent={ ()=> <View style={ { height:10,} } />}
      //     data={this.state.buffer}
      //     renderItem={({item}) => <View>
      //       <TouchableOpacity style={styles.container}
      //                         onPress={() => {this.props.para.navigation.navigate('temp')}}>
      //        <View>
      //           <Text>{item.key}</Text>
      //           <Text>{item.desc}</Text>
      //        </View>
      //       </TouchableOpacity>
      //       </View>
      //   }
      //   />
      //   </View>
      //   </ScrollView>
      // </TouchableWithoutFeedback>
      <ScrollableTabView
        style={{marginTop: 5, marginBottom: 0}}
        initialPage={0}
        tabBarActiveTextColor='#E3170D'
        tabBarUnderlineStyle={{backgroundColor: '#E3170D'}}
        renderTabBar={()=><ScrollableTabBar tabStyle={{height:39}}/>}
      >
        <ScrollView tabLabel="Attending">
          <CardList navigation={navigation}/>
        </ScrollView>
        <ScrollView tabLabel="Hosting">
          <View></View>
        </ScrollView>
      </ScrollableTabView>
      )
    }  
}