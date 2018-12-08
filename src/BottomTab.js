import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../src/Styles'
import Home from '../src/Home'
import Profile from '../src/Profile'
import CreateEvent from '../src/CreateEvent'
import MyEvents from '../src/MyEvents'

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
    handleToChangeSelectedTab = this.handleToChangeSelectedTab.bind(this)
    this.state = {
      user: {
        email: "",
        password: "",
        name: "",
        interests: [],
        accountCreationDate: 0
      },
      selectedTab: 'Home',
      key: '',
    }
  }

  static navigationOptions = {
    gesturesEnabled: false,
    headerLeft: null,
    title: 'SWAT',
  };

  handleToChangeSelectedTab(tab) {
    this.setState({selectedTab: tab})
  }

  async Logout(){
    var user = firebase.auth().currentUser;
    if(user){
      await firebase.auth().signOut();
      this.props.navigation.navigate('Login');
    }else{
      alert("User not logged in!");
    }
  }

  render(){
    handleToChangeSelectedTab = this.handleToChangeSelectedTab;
    const {navigation} = this.props;
    return(
      <TabNavigator tabBarStyle={{backgroundColor:'white'}} style={{backgroundColor:'white'}}>
      <TabNavigator.Item
        title="Home"
        selectedTitleStyle={{color: '#E3170D', fontWeight: 'bold'}}
        selected={this.state.selectedTab === 'Home'}
        renderIcon={() => <Icon name={'md-home'} size={22}/>}
        renderSelectedIcon={() => <Icon name={'md-home'} size={22} color={'#E3170D'}/>}
        onPress={() => this.setState({selectedTab: 'Home'})}
      >
      <Home navigation={navigation} hh={new Date()}/>
      </TabNavigator.Item>
      <TabNavigator.Item
          title="MyEvent"
          selectedTitleStyle={{color: '#E3170D', fontWeight: 'bold'}}
          selected={this.state.selectedTab === 'event'}
          renderIcon={()=> <Icon name={'md-calendar'} size={22}/>}
          renderSelectedIcon={()=> <Icon name={'md-calendar'} size={22} color={'#E3170D'}/>}
          onPress={()=>this.setState({selectedTab: 'event'})}
        >
        <MyEvents navigation={navigation} hh={new Date()}/>
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Create"
        selectedTitleStyle={{color: '#E3170D', fontWeight: 'bold'}}
        selected={this.state.selectedTab === 'create'}
        renderIcon={() => <Icon name={'ios-add-circle-outline'} size={22}/>}
        renderSelectedIcon={()=> <Icon name={'ios-add-circle-outline'} size={22} color={'#E3170D'}/>}
        onPress={()=>this.setState({selectedTab: 'create'})}
      >
        <CreateEvent navigation={navigation}/>
      </TabNavigator.Item>
      <TabNavigator.Item
        title="Profile"
        selectedTitleStyle={{color: '#E3170D', fontWeight: 'bold'}}
        selected={this.state.selectedTab === 'profile'}
        renderIcon={() => <Icon name={'ios-person'} size={22}/>}
        renderSelectedIcon={()=> <Icon name={'ios-person'} size={22} color={'#E3170D'}/>}
        onPress={()=> this.setState({selectedTab: 'profile'})}
        >
        <View style={styles.container}>
        <Profile navigation={navigation} hh={new Date()}/>
        <TouchableOpacity
        style={styles.button1}
        onPress={this.Logout.bind(this)}
        >
        <Text style={styles.submitText}>Log out</Text>
        </TouchableOpacity>
        </View>
      </TabNavigator.Item>
      
    </TabNavigator>
    )
  }
}