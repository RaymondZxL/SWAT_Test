import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles'
import MainPage from './MainPage'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
        name: "",
        interests: [],
        accountCreationDate: 0
      },
      selectedTab: 'home',
    }
  }

  static navigationOptions = {
    headerLeft: null,
    title: 'SWAT',
  };

  Logout(){
    var user = firebase.auth().currentUser;
    if(user){
      firebase.auth().signOut();
    }else{
      alert("User not logged in!");
    }
  }

  render(){
    return(
      <TabNavigator tabBarStyle={{backgroundColor:'white'}} style={{backgroundColor:'white'}}>
      <TabNavigator.Item
        title="Home"
        selected={this.state.selectedTab === 'home'}
        renderIcon={() => <Icon name={'ios-home'} size={22}/>}
        renderSelectedIcon={() => <Icon name={'ios-home'} size={22} color={'blue'}/>}
        onPress={() => this.setState({selectedTab: 'home'})}
      >
      <MainPage/>
      </TabNavigator.Item>
      <TabNavigator.Item
          title="MyEvent"
          selected={this.state.selectedTab === 'event'}
          renderIcon={()=> <Icon name={'ios-albums'} size={22}/>}
          renderSelectedIcon={()=> <Icon name={'ios-albums'} size={22} color={'blue'}/>}
          onPress={()=>this.setState({selectedTab: 'event'})}
        >
      <Text>ggg</Text>
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Create"
        selected={this.state.selectedTab === 'create'}
        renderIcon={() => <Icon name={'ios-add'} size={22}/>}
        renderSelectedIcon={()=> <Icon name={'ios-add'} size={22} color={'blue'}/>}
        onPress={()=>this.setState({selectedTab: 'create'})}
      >
        <Text>hfuehfueh</Text>
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Profile"
        selected={this.state.selectedTab === 'profile'}
        renderIcon={() => <Icon name={'ios-book'} size={22}/>}
        renderSelectedIcon={()=> <Icon name={'ios-book'} size={22} color={'blue'}/>}
        onPress={()=> this.setState({selectedTab: 'profile'})}
      >
        <TouchableOpacity
        style={styles.button1}
        onPress={this.Logout}
        >
        <Text style={styles.buttonText}> Log out </Text>
        </TouchableOpacity>
      </TabNavigator.Item>
      
    </TabNavigator>
    )
  }
}
