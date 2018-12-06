import React, { Component } from 'react';
import { Keyboard, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { createStackNavigator,NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Ionicons';
import { TagSelect } from "react-native-tag-select";
// import MyEvent from './MyEvent';

const { width: WIDTH } = Dimensions.get('window');
const data = [
    { id: 1, label: 'Arts & Crafts'},
    { id: 2, label: 'Business & Tech'},
    { id: 3, label: 'Fairs & Festivals'},
    { id: 4, label: 'Food & Dining'},
    { id: 5, label: 'Dance'},
    { id: 6, label: "Gaming"},
    { id: 7, label: 'Music'},
    { id: 8, label: "Sports"},
    { id: 9, label: 'Study'},
    { id: 10, label: 'Other'},
];
export default class CreateEvent extends Component{
	constructor(props){
		super(props);
		this.state = {
      event: '',
      descirption: '',
      date:'',
      time: '',
      location: '',
      tag: null, 
      maxCapacity: null
		}
	}

	async onSubmit(){
    if (this.state.event === ""){
      alert('Please enter valid name!');
      return;
    }
    if (this.state.description === ""){
      alert('Please enter description');
      return;
    }
    if (this.state.date === ""){
      alert('Please select date');
      return;
    }
    if (this.state.time === ""){
      alert('Please select time');
      return;
    }
    if (this.state.location === ""){
      alert('Please enter valid location');
      return;
    }
    if (this.tag.totalSelected == 0){
      alert('Please select at least one category');
      return;
    }
    if (!this.state.maxCapacity) {
        // alert(this.state.maxCapacity)
        // this.setState({maxCapacity: Number.MAX_VALUE})
        this.state.maxCapacity = Number.MAX_VALUE
    }
      user = firebase.auth().currentUser;
      if(user != null){
        var numberOfEvents = 0;
        await firebase.database().ref('Events').once('value', function(snapshot){
          numberOfEvents = snapshot.val().NumberOfEvents.numberOfEvents;
        });
        await firebase.database().ref('Events/').child(numberOfEvents).set({
              eventName: this.state.event,
              location: this.state.location,
              description: this.state.description,
              date: this.state.date,
              time: this.state.time,
              user: user.email,
              category:this.tag.itemsSelected,
              maxCapacity: this.state.maxCapacity
          }).then((data)=>{
              //success callback
              // handleToChangeSelectedTab = this.props.handleToChangeSelectedTab;
              // handleToChangeSelectedTab('event')
              // this.props.navigation.navigate('Home')
              this.props.navigation.reset([NavigationActions.navigate({routeName: 'Home'})], 0)
              alert('Event Created Successfully!'); 
          }).catch((error)=>{
              //error callback
              console.log('error ' , error)
              return;
          })
          // var a;
          // await firebase.database().ref('Events/').child(0).once('value', function(snapshot){
          //   a = snapshot.val().eventName;

          // });

          // alert(a);
          eventN = numberOfEvents
          numberOfEvents += 1;
        

          await firebase.database().ref('Events').child('NumberOfEvents').set({numberOfEvents});

          // await firebase.database().ref('Users').child(user.uid).child('listOfEvents').push({eventN});
          //await firebase.database().ref('Users').child(user.uid).child('NumberOfEvents').set({})
      
		}
	}

  render() {
    return(
        <KeyboardAvoidingView style={styles.container1} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.container1}>
                        <TouchableOpacity style={{margin:10, padding:10, alignItems:'center'}} onPress={this.myfun}>
                            <Icon name={'ios-radio-button-off'} style={{opacity: 0.7, color:'gray'}} size = {130}/>
                            <Icon name={'ios-camera'} style={{opacity:0.7, color:'gray', position:'absolute', marginTop: 55}} size = {40}/>
                        </TouchableOpacity>

                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{color:'#cc0f0f', fontWeight: 'bold'}}>Event Name</Text>
                            <TextInput
                                style={styles.eventInput}
                                event={this.state.event}
                                keyboardType = 'default'
                                onChangeText={(event) => this.setState({ event })}
                                borderBottomColor = '#D3D3D3'
                                borderBottomWidth = {2}
                            />
                        </View>

                        <Text style={{color:'#cc0f0f', fontWeight: 'bold', marginTop: 5, width: WIDTH - 100}}>Time</Text>
                        <View style={{justifyContent:'space-around', flexDirection: 'row'}}>
                            <Icon name={'ios-arrow-down'} style={{color:'#D3D3D3', position:'absolute', marginLeft: (WIDTH - 100)/2 - 25, marginTop: 12}} size = {15}/>
                            <DatePicker
                                style={{width: (WIDTH - 100)/2 - 7, height: 45}}
                                date={this.state.date}
                                mode="date"
                                placeholder="Select Date"
                                placeholderTextColor = 'gray'
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                minDate={new Date()}
                                cancelBtnText="Cancel"
                                borderBottomColor = '#D3D3D3'
                                borderBottomWidth = {2}
                                showIcon = {false}
                                customStyles={{
                                    dateInput: {
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        borderTopWidth: 0,
                                        borderBottomWidth: 2,
                                        borderColor: '#D3D3D3',
                                    },
                                    btnTextConfirm: {
                                        color: '#cc0f0f',
                                    },
                                    btnTextCancel: {
                                        color: 'gray',
                                    }
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />

                            <TextInput
                                editable={false}
                                borderColor='white'
                                borderWidth = {5}
                            />

                            <Icon name={'ios-arrow-down'} style={{color:'#D3D3D3', position:'absolute', marginLeft: WIDTH - 120, marginTop: 12}} size = {15}/>
                            <DatePicker
                                style={{width: (WIDTH - 100)/2 - 7, height: 45}}
                                date={this.state.time}
                                mode="time"
                                placeholder="Select Time"
                                placeholderTextColor = 'gray'
                                format="HH:mm"
                                // minDate={new Date()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                minuteInterval={10}
                                showIcon = {false}
                                customStyles={{
                                    dateInput: {
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        borderTopWidth: 0,
                                        borderBottomWidth: 2,
                                        borderColor: '#D3D3D3',
                                    },
                                    btnTextConfirm: {
                                        color: '#cc0f0f',
                                    },
                                    btnTextCancel: {
                                        color: 'gray',
                                    }
                                }}
                                onDateChange={(time) => {this.setState({time: time})}}
                            />
                        </View>

                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{color:'#cc0f0f', fontWeight: 'bold'}}>Location</Text>
                            <TextInput
                                style={styles.eventInput}
                                value={this.state.location}
                                keyboardType = 'default'
                                onChangeText={(location) => this.setState({ location })}
                                borderBottomColor = '#D3D3D3'
                                borderBottomWidth = {2}
                            />
                        </View>

                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{color:'#cc0f0f', fontWeight: 'bold', marginTop: 5, marginBottom: 5}}>Description</Text>
                            <TextInput
                                style={styles.descriptionInput}
                                value={this.state.description}
                                keyboardType = 'default'
                                onChangeText={(description) => this.setState({ description })}
                                borderColor = '#D3D3D3'
                                borderWidth = {2}
                                borderRadius = {5}
                                multiline = {true}
                            />
                        </View>

                        <Text style={{color:'#cc0f0f', fontWeight: 'bold', marginTop: 5, width: WIDTH - 100, marginBottom: 5}}>Categories</Text>
                        <TagSelect
                            data = {data}
                            itemStyleSelected = {{opacity: 0.5, backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1}}
                            containerStyle = {{marginLeft: 60, marginRight: 50}}
                            ref = {(tag)=>{this.tag = tag}}
                        />

                        <View style={{justifyContent:'space-around'}}>
                            <Text style={{color:'#cc0f0f', fontWeight: 'bold'}}>Max Capacity</Text>
                            <TextInput
                                style={styles.eventInput}
                                keyboardType = 'numeric'
                                placeholder="(optional)"
                                placeholderTextColor = 'gray'
                                onChangeText={(maxCapacity) => this.setState({ maxCapacity })}
                                borderBottomColor = '#D3D3D3'
                                borderBottomWidth = {2}
                            />
                        </View>

                        <TouchableOpacity style={styles.button1} onPress={this.onSubmit.bind(this)}>
                            <Text style={styles.submitText}> Create </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
}

const styles = StyleSheet.create({
container1: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
},

submitText: {
  fontFamily: 'Avenir',
  fontSize: 20,
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
},

button1: {
  alignItems: 'center',
  backgroundColor: '#cc0f0f',
  opacity: 0.7,
  width: 300,
  height: 44,
  padding: 10,
  borderWidth: 0,
  borderColor: 'transparent',
  borderRadius: 5,
  marginBottom: 10,
  marginTop: 10,
},

descriptionInput: {
  width: WIDTH - 100,
  height: 135,
  fontSize: 16,
  paddingLeft: 5,
},

eventInput: {
  width: WIDTH - 100,
  height: 45,
  fontSize: 16,
  paddingLeft: 5,
},
});