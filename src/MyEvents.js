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
      recommenddata: [],
      eventArray: [],
      initialpage: 10,
      temp_fav: [],
      temp_attend: [],
    }
    //this.setup();

  }
  componentWillReceiveProps() {
    this.setup()
  }
  componentWillMount() {
    this.setup();
  }

  // test(){
  //   alert("something");
  // }

  async setup(){
    this.setState({buffer_attend: []})
    this.setState({buffer_attend_data: []})
    this.setState({buffer_favorite_data: []})
    this.setState({buffer_favorite: []})
    this.setState({buffer_host: []})
    //this.setState({recommenddata: []})

    buffer_host = []
    var user = firebase.auth().currentUser;
    await firebase.database().ref('Users/').child(user.uid).once('value', function(snapshot){
      this.setState({buffer_favorite: snapshot.val().ListOfFavorite});
      this.setState({buffer_attend: snapshot.val().ListOfAttending});
    }.bind(this));

    await firebase.database().ref('Events').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {

            this.state.eventArray.push({
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
          //this.setState({event:childSnapshot.val().eventName})
          if(childSnapshot.val().user === user.email){
            buffer_host.push({
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

          if (this.state.buffer_favorite) {
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
          }}

          if(this.state.buffer_attend) {
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
          }}
        }
      }.bind(this))
    }.bind(this))
    this.setState({obj: 'dsadas'});

  if (user != null) {
      interest = null
      // alert(user.email)
      // alert(user.uid)
      await firebase.database().ref('Users/').child(user.uid).once('value').then(function(snapshot){
        interest = snapshot.val().interest;
        for (var i = 0; i < interest.length; i++) {
          var cat = interest[i]
          // console.log(cat)
          eventArray = this.state.eventArray
        
          for(var j = 0; j < eventArray.length; j++) {
            var event = eventArray[j]
            // console.log(event)
            // data = this.state.data
            var eventCat = event.category
            // console.log(eventCat)
            if (eventCat && !this.state.recommenddata.includes(event)){
              for (var p = 0; p < eventCat.length; p++) {
                if (eventCat[p].id == cat.id)
                  this.state.recommenddata.push(event)
              }  
            }
          }
        }
      }.bind(this))
      // alert(this.state.recommenddata.length)
    }
    this.setState({initialpage: 0});
    this.setState({buffer_host: buffer_host})
    this.setState({temp_fav: this.state.buffer_favorite_data})
    this.setState({temp_attend: this.state.buffer_attend_data})
  }


  handleOnNavigateBack=() => {
    this.setup()
  }

  test(){
    alert("pressed");
  }


    render(){
      const {navigation} = this.props
      return(

      <ScrollableTabView
        style={{marginTop: 5, marginBottom: 0}}
        initialPage={10}
        tabBarActiveTextColor='#E3170D'
        tabBarUnderlineStyle={{backgroundColor: '#E3170D'}}
        renderTabBar={()=><ScrollableTabBar tabStyle={{height:39}}/>}
      >
        {/* <ScrollView>
            <Button
            onPress={this.setup.bind(this)}
            title="refresh"
          />
        </ScrollView> */}

        <ScrollView tabLabel="Recommend">
          <CardList navigation={navigation} data={this.state.recommenddata} hosting={false} handleOnNavigateBack={this.handleOnNavigateBack}/>
        </ScrollView>
        <ScrollView tabLabel="Attending">
          <CardList navigation={navigation} data={this.state.temp_attend} hosting={false} handleOnNavigateBack={this.handleOnNavigateBack}/> 
        </ScrollView>
        <ScrollView tabLabel="Favorite">
          <CardList navigation={navigation} data={this.state.temp_fav} hosting={false} handleOnNavigateBack={this.handleOnNavigateBack}/> 
        </ScrollView> 
        <ScrollView tabLabel="Hosting">
          <CardList navigation={navigation} data={this.state.buffer_host} hosting={true} handleOnNavigateBack={this.handleOnNavigateBack}/>
        </ScrollView>
      </ScrollableTabView>
      )
    }  
}

export default myEvents;