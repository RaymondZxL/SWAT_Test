import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput,TouchableHighlight, View, Stylesheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

import styles from '../src/Styles'
import MyEvents from '../src/MyEvents'

var temp = require('../src/MyEvents');
// import firebase from '../src/firebase'

export default class CreateEvent extends Component{
  constructor(props) {
    super(props);
    this.superData = this.props.navigation.getParam('data', 'None');
    this.state = {
      email: '',
      interest: '',
      name: '',
      numberOfEvent: '',
      uid: '',
      key: '',
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      value_color1: 'grey',
      value_color2: 'grey',
      buffer: [],
      buffer_2: [],
      buffer_cata: [],
      user: '',
      eventName: '',
      favoriteNum: '',
      liked: '',
    }
  } 

  async componentDidMount(){
    var data = this.props.navigation.getParam('data', 'None');
    var uid = firebase.auth().currentUser.uid;
    await firebase.database().ref('Events/').child(data.key).once('value', function(snapshot){
     //snapshot.forEach(function(childSnapshot){
        this.setState({user: snapshot.val().user});
        this.setState({time: snapshot.val().time});
        this.setState({eventName: snapshot.val().eventName});
        this.setState({description: snapshot.val().description});
        this.setState({location: snapshot.val().location});
        this.setState({date: snapshot.val().numberOfEvents});
        this.setState({buffer_cata: snapshot.val().catagory});
        this.setState({favoriteNum: snapshot.val().favoriteNum});
        if(this.state.favoriteNum == null){
          this.setState({favoriteNum: 0});
        }
     //}.bind(this))
    }.bind(this));

    await firebase.database().ref('Users/').child(uid).once('value', function(snapshot){
     //snapshot.forEach(function(childSnapshot){
        this.setState({email: snapshot.val().email});
        this.setState({interest: snapshot.val().interest});
        this.setState({uid: snapshot.val().uid});
        this.setState({name: snapshot.val().name});
        this.setState({numberOfEvents: snapshot.val().numberOfEvents});
        if(snapshot.val().ListOfFavorite != null)
          this.setState({buffer: snapshot.val().ListOfFavorite});
        if(snapshot.val().ListOfAttending != null)
          this.setState({buffer_2: snapshot.val().ListOfAttending});
     //}.bind(this))
    }.bind(this));

    if(this.state.buffer.includes(data.key)){
      this.setState({value_color2:"#E3170D"});
    }
    if(this.state.buffer_2.includes(data.key)){
      this.setState({value_color1:"#E3170D"});
    }
  }

  onSubmit(){
    //alert(MyEvents)
    //this.props.navigation.navigate('MyEvents');
  }


  async onSubmit_like(){
    var data = this.props.navigation.getParam('data', 'None');
    var uid = firebase.auth().currentUser.uid;

    if(this.state.value_color2 === 'grey'){
      this.state.buffer.push(data.key);
      this.state.favoriteNum += 1;
    }else{
      var i = this.state.buffer.indexOf(data.key);
      var removedItem = this.state.buffer.splice(i, 1);
      this.state.favoriteNum -= 1;
    }
    
    await firebase.database().ref('Events/').child(data.key).set({
      user: this.state.user,
      time: this.state.time,
      eventName: this.state.eventName,
      description: this.state.description,
      location: this.state.location,
      date: this.state.date,
      buffer_cata: this.state.buffer_cata,
      favoriteNum: this.state.favoriteNum,
    });

    await firebase.database().ref('Users/').child(uid).set({
      email: this.state.email,
      interest: this.state.interest,
      uid: this.state.uid,
      name: this.state.name,
      numberOfEvents: this.state.numberOfEvents,
      ListOfFavorite: this.state.buffer,
      ListOfAttending: this.state.buffer_2,
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
    this.state.value_color2 === 'grey' ? this.setState({value_color2:"#E3170D"}): this.setState({value_color2:'grey'})
  }

  async onSubmit_attend(){
    var data = this.props.navigation.getParam('data', 'None');
    var uid = firebase.auth().currentUser.uid;

    if(this.state.value_color1 === 'grey'){
      this.state.buffer_2.push(data.key);
    }else{
      var i = this.state.buffer_2.indexOf(data.key);
      var removedItem = this.state.buffer_2.splice(i, 1);
    }

    await firebase.database().ref('Users/').child(uid).set({
      email: this.state.email,
      interest: this.state.interest,
      uid: this.state.uid,
      name: this.state.name,
      numberOfEvents: this.state.numberOfEvents,
      ListOfFavorite: this.state.buffer,
      ListOfAttending: this.state.buffer_2,
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
    this.state.value_color1 === 'grey' ? this.setState({value_color1:"#E3170D"}): this.setState({value_color1:'grey'})
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <View style={{flex:1, backgroundColor: '#fff',flexDirection: 'column', alignItems: 'center',justifyContent: 'center',marginLeft:30,marginRight:30}}>
  

            <ResponsiveImage style = {{height:100,width:150,margin:20}} source={require('../assets/event.jpg')}/>
            <View style={styles.contaierRow}>
              <Text style={styles.textBox}>Title:</Text>
              <Text style= {styles.contents}>{this.superData.eventName}</Text>
        
              <Text style={styles.textBox}>Description:</Text>
              <Text style= {styles.contents}>{this.superData.description}</Text>
        
              <Text style={styles.textBox}>Date:</Text>
              <View style={{ flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
                <Icon name = {"calendar"} size={26} color = {"#E3170D"} style = {{flex:1}}/>
                <Text style = {{fontFamily: 'Avenir', fontSize: 18, alignItems:'center', justifyContent: 'center', marginBottom: 30, flex:6}}>
                  {this.superData.date}
                </Text>
              </View>
        
              <Text style={styles.textBox}>Time:</Text>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
                <Icon name = {"clock"} size={26} color = {"#E3170D"} style = {{flex:1}}/>
                <Text style = {{fontFamily: 'Avenir', fontSize:18, alignItems: 'center', justifyContent: 'center', marginBottom:30, flex:6}}>{this.superData.time}</Text>
              </View>
        
              <Text style={styles.textBox}>Location:</Text>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:30}}>
                <Icon name = {"location"} size={26} color = {"#E3170D"} style = {{flex:1}}/>
                <Text style = {{fontFamily: 'Avenir', fontSize:18, alignItems: 'center', justifyContent: 'center', marginBottom:30, flex:6}}>{this.superData.location}</Text>
              </View>

            </View>
          </View>
        </ScrollView>
        <Icon1
          color = {this.state.value_color1}
          onPress = {this.onSubmit_attend.bind(this)}
          name={"md-checkbox"} 
          size={35}
          style = {{position: "absolute",bottom:30,right:20}}/>
        <Icon1 
          color = {this.state.value_color2}
          onPress = {this.onSubmit_like.bind(this)}
          name={"md-heart"} 
          size={35}
          style = {{position: "absolute",bottom:30,right:80}}/>
        {/*<TouchableOpacity
          style={styles.button1}
          onPress={this.onSubmit.bind(this)}
          >
          <Text style={styles.buttonText}> Save </Text>
        </TouchableOpacity>*/}
      </KeyboardAvoidingView>
    )
  }
}