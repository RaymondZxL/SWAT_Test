import React, { Component } from 'react';
import { ScrollView, View, FlatList, Alert, Button, Text, TouchableOpacity, TextInput, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CardList from '../src/CardList';

import styles from '../src/Styles'

const dismissKeyboard = require('dismissKeyboard')

class myEvents extends Component{
  constructor(props){
    super(props);
    this.state = {
      event: '',
      location: '',
      obj: '',
      buffer_attend: [],
      buffer_host: [],
      buffer_favorite: [],
      buffer_favorite_data: [],
      buffer_attend_data: [],
    }
    //this.setup();

  }

  componentDidMount(){
    this.setup();
  }

  componentWillUnmount() {

  }

  test(){
    alert("something");
  }

  async setup(){
    this.setState({buffer_attend: []})
    this.setState({buffer_attend_data: []})
    this.setState({buffer_favorite_data: []})
    this.setState({buffer_favorite: []})
    this.setState({buffer_host: []})
    var user = firebase.auth().currentUser;
    await firebase.database().ref('Users/').child(user.uid).once('value', function(snapshot){
      this.setState({buffer_favorite: snapshot.val().ListOfFavorite});
      this.setState({buffer_attend: snapshot.val().ListOfAttending});
    }.bind(this));

    await firebase.database().ref('Events').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {
          //this.setState({event:childSnapshot.val().eventName})
          if(childSnapshot.val().user === user.email){
            this.state.buffer_host.push({
            // key: childSnapshot.val().key,
              key: childSnapshot.key,
              date:childSnapshot.val().date,
              description:childSnapshot.val().description,
              eventName:childSnapshot.val().eventName,
              location:childSnapshot.val().location,
              time:childSnapshot.val().time,
              user:childSnapshot.val().user,
              category:childSnapshot.val().category,
              favoriteArray:childSnapshot.val().favoriteArray,
              attending:childSnapshot.val().attending,
            })
          }

          if(this.state.buffer_favorite.includes(childSnapshot.key)){
            this.state.buffer_favorite_data.push({
            // key: childSnapshot.val().key,
              key: childSnapshot.key,
              date:childSnapshot.val().date,
              description:childSnapshot.val().description,
              eventName:childSnapshot.val().eventName,
              location:childSnapshot.val().location,
              time:childSnapshot.val().time,
              user:childSnapshot.val().user,
              category:childSnapshot.val().category,
              favoriteArray:childSnapshot.val().favoriteArray,
              attending:childSnapshot.val().attending,
            })
          }

          if(this.state.buffer_attend.includes(childSnapshot.key)){
            this.state.buffer_attend_data.push({
            // key: childSnapshot.val().key,
              key: childSnapshot.key,
              date:childSnapshot.val().date,
              description:childSnapshot.val().description,
              eventName:childSnapshot.val().eventName,
              location:childSnapshot.val().location,
              time:childSnapshot.val().time,
              user:childSnapshot.val().user,
              category:childSnapshot.val().category,
              favoriteArray:childSnapshot.val().favoriteArray,
              attending:childSnapshot.val().attending,
            })
          }
        }
      }.bind(this))
    }.bind(this))
    this.setState({obj: 'dsadas'});

  }



    render(){
      const {navigation} = this.props.para
      return(

      <ScrollableTabView
        style={{marginTop: 5, marginBottom: 0}}
        initialPage={0}
        tabBarActiveTextColor='#E3170D'
        tabBarUnderlineStyle={{backgroundColor: '#E3170D'}}
        renderTabBar={()=><ScrollableTabBar tabStyle={{height:39}}/>}
      >
        <ScrollView>
            <Button
            onPress={this.setup.bind(this)}
            title="refresh"
          />
        </ScrollView>
        <ScrollView tabLabel="Attending">
          <CardList navigation={navigation} data={this.state.buffer_attend_data}/> 
        </ScrollView>
        <ScrollView tabLabel="Favorite">
          <CardList navigation={navigation} data={this.state.buffer_favorite_data}/> 
        </ScrollView> 
        <ScrollView tabLabel="Hosting">
          <CardList navigation={navigation} data={this.state.buffer_host}/>
        </ScrollView>
        <ScrollView >
        </ScrollView>
      </ScrollableTabView>
      )
    }  
}

export default myEvents;
















