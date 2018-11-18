import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../src/Styles'
import MainPage from '../src/MainPage'
import Profile from '../src/Profile'
import CreateEvent from '../src/CreateEvent'
import MyEvent from '../src/MyEvents'

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
    gesturesEnabled: false,
    headerLeft: null,
    title: 'SWAT',
  };



  Logout(){
    var user = firebase.auth().currentUser;
    if(user){
      firebase.auth().signOut();
      this.props.navigation.navigate('Main');
    }else{
      alert("User not logged in!");
    }

    var i = 0;
      while(i <= 100000000/4){
        i++;
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
      <MyEvent para={this.props}/>
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Create"
        selected={this.state.selectedTab === 'create'}
        renderIcon={() => <Icon name={'ios-add'} size={22}/>}
        renderSelectedIcon={()=> <Icon name={'ios-add'} size={22} color={'blue'}/>}
        onPress={()=>this.setState({selectedTab: 'create'})}
      >
        <CreateEvent/>
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Profile"
        selected={this.state.selectedTab === 'profile'}
        renderIcon={() => <Icon name={'ios-book'} size={22}/>}
        renderSelectedIcon={()=> <Icon name={'ios-book'} size={22} color={'blue'}/>}
        onPress={()=> this.setState({selectedTab: 'profile'})}
        >
        <View style={styles.container}>
        <Profile para={this.props}/>
        <TouchableOpacity
        style={styles.button1}
        onPress={this.Logout.bind(this)}
        >
        <Text style={styles.buttonText}> Log out </Text>
        </TouchableOpacity>
        </View>
      </TabNavigator.Item>
      
    </TabNavigator>
    )
  }
}
