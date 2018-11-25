import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput,TouchableHighlight, View, Stylesheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';

import styles from '../src/Styles'
// import firebase from '../src/firebase'

export default class CreateEvent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      value_color1: 'grey',
      value_color2: 'grey',
    }
  }

  onSubmit(){
    const date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if(this.state.title === '' || this.state.description === '' || this.state.date === '' || this.state.time === '' || this.state.location === ''){
      alert('Entries Cannot Be Empty!');
    }else{
      /*user.email = this.state.email;
      user.name = this.state.name;
      user.birthday = this.state.birthday;
      user.password = this.state.password;
      this.PushToFireBase();*/
      this.props.navigation.navigate('MyEvents');
    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <View style={{flex:1, backgroundColor: '#fff',flexDirection: 'column', alignItems: 'center',justifyContent: 'center',marginLeft:30,marginRight:30}}>
            <ResponsiveImage style = {{height:100,width:150,margin:20}} source={require('../assets/event.jpg')}/>
            <View style={styles.contaierRow}>
              <Text style={styles.textBox}>Title:</Text>
              <Text style= {styles.contents}>This is an event.</Text>
        
              <Text style={styles.textBox}>Description:</Text>
              <Text style= {styles.contents}>This event is about asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,asdvdghnkulo,
              dvdghnkulo,</Text>
        
              <Text style={styles.textBox}>Date:</Text>
              <View style={{ flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
                <Icon name = {"calendar"} size={26} color = {"#E3170D"} style = {{flex:1}}/>
                <Text style = {{fontFamily: 'Avenir', fontSize: 18, alignItems:'center', justifyContent: 'center', marginBottom: 30, flex:6}}>
                  2018/11/17
                </Text>
              </View>
        
              <Text style={styles.textBox}>Time:</Text>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
                <Icon name = {"clock"} size={26} color = {"#E3170D"} style = {{flex:1}}/>
                <Text style = {{fontFamily: 'Avenir', fontSize:18, alignItems: 'center', justifyContent: 'center', marginBottom:30, flex:6}}>12:00</Text>
              </View>
        
              <Text style={styles.textBox}>Location:</Text>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
                <Icon name = {"location"} size={26} color = {"#E3170D"} style = {{flex:1}}/>
                <Text style = {{fontFamily: 'Avenir', fontSize:18, alignItems: 'center', justifyContent: 'center', marginBottom:30, flex:6}}>9500 gilman dr</Text>
              </View>

            </View>
          </View>
        </ScrollView>
        <Icon1
          color = {this.state.value_color1}
          onPress = {()=> {this.state.value_color1 === 'grey' ? this.setState({value_color1:"#E3170D"}): this.setState({value_color1:'grey'})}}
          name={"md-checkbox"} 
          size={35}
          style = {{position: "absolute",bottom:30,right:20}}/>
        <Icon1 
          color = {this.state.value_color2}
          onPress = {()=> {this.state.value_color2 === 'grey' ? this.setState({value_color2:"#E3170D"}): this.setState({value_color2:'grey'})}}
          name={"md-heart"} 
          size={35}
          style = {{position: "absolute",bottom:30,right:80}}/>
      </KeyboardAvoidingView>
    )
  }
}