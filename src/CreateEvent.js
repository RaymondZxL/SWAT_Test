import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon1 from 'react-native-vector-icons/Ionicons';
import styles from '../src/Styles'
import {TagSelect} from "react-native-tag-select";

const {width: WIDTH} = Dimensions.get('window')

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

export default class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {
      event: '',
      descirption: '',
      date:'',
      time: '',
      location: '',
      tag: null
		}
	}

	async onSubmit(){
    if (this.state.event === "")
      alert('Please enter valid name!');
    else if (this.state.description === "")
      alert('Please enter description');
    else if (this.state.date === "")
      alert('Please select date');
    else if (this.state.time === "")
      alert('Please select time');
    else if (this.state.location === "")
      alert('Please enter valid location');
    else if (this.tag.totalSelected == 0)
      alert('Please select at least one category')
    else {
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
              category:JSON.stringify(this.tag.itemsSelected) 
          }).then((data)=>{
              //success callback
              handleToChangeSelectedTab = this.props.handleToChangeSelectedTab;
              handleToChangeSelectedTab('event')
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
          await firebase.database().ref('Users').child(user.uid).child('NumberOfEvents').set({})
      }
		}
	}

    render(){
      return(
      //   <TouchableWithoutFeedback behavior="padding" onPress={()=>{dismissKeyboard()}}>
      //   <ScrollView>
      //   <View style={styles.container}>
      //     <Text style={styles.title}> creating</Text>
      //     <Text style={styles.textBox}>Event:</Text>
      //   <TextInput
      //   maxLength={35}
      //   value={this.state.event}
      //   keyboardType = 'default'
      //   onChangeText={(event) => this.setState({ event })}
      //   placeholder='event'
      //   placeholderTextColor = 'gray'
      //   style={styles.input}
      // />
      //   <Text>----------</Text>
      //   <Text style={styles.textBox}>location:</Text>
      //   <TextInput
      //   maxLength={35}
      //   value={this.state.location}
      //   keyboardType = 'default'
      //   onChangeText={(location) => this.setState({ location })}
      //   placeholder='location'
      //   placeholderTextColor = 'gray'
      //   style={styles.input}
      // />
      //       <TouchableOpacity
      //   style={styles.button1}
      //   onPress={this.setup.bind(this)}
      //   >

      //   <Text style={styles.buttonText}> submit </Text>
      // </TouchableOpacity>

      //   </View>
      //   </ScrollView>
      // </TouchableWithoutFeedback>





      // <KeyboardAvoidingView style={styles.container} behavior="padding">
      //   <ScrollView>
      //     <View style={styles.container}>
      //       <Text style={styles.textBox}>Upload Image:</Text>
      //       <View>
      //         <Text style={styles.textBox}>Title:</Text>
      //         <TextInput
      //           event={this.state.event}
      //           onChangeText={(event)=> this.setState({event})}
      //           placeholder='Event Title'
      //           placeholderTextColor='gray'
      //           style={styles.input}
      //         />

      //         <Text style={styles.textbox}>Description:</Text>
      //         <TextInput
      //           description={this.state.description}
      //           multiline
      //           onChangeText={(description)=>this.setState({description})}
      //           placeholder='What is your event about?'
      //           placeholderTextColor='gray'
      //           // style={styles.description}
      //         />

      //         <Text style={styles.textBox}>Date:</Text>
      //         <DatePicker
      //           style={{width:150}}
      //           date={this.state.date}
      //           mode="date"
      //           placeholder="select data"
      //           format="YYYY-MM-DD"
      //           confirmBtnText="confirm"
      //           cancelBtnText="Cancel"
      //           iconSource={require('../assets/calendar.png')}
      //           customStyles={{dateIcon: {position:'absolute', left:0, top:4,},
      //                          dateInput: {marginLeft:40}}}
      //           onDateChange={(date)=>{this.setState({date: date})}}
      //           />

      //         <Text style={styles.textBox}>Time:</Text>
      //         <DatePicker style={{width:150}}
      //           time={this.state.time}
      //           mode="time"
      //           placeholder="select time"
      //           format="HH:mm"
      //           confirmBtnText="Confirm"
      //           cancelBtnText="Cancel"
      //           minuteInterval={10}
      //           iconSource={require('../assets/time.png')}
      //           customStyles={{dateIcon: {position:'absolute', left: 0, top: 4, marginLeft:3},
      //                          dateInput:{marginLeft: 39}}}
      //           onDateChange={(time) => {this.setState({time: time})}}
      //           />
                
      //         <Text styles={styles.textBox}>Location:</Text>
      //         <TextInput
      //           location={this.state.location}
      //           onChangeText={(location)=>this.setState({location})}
      //           placeholder='9500 Gilman Dr'
      //           placeholderTextColor='gray'
      //           style={styles.input}
      //         />

      //         <TouchableOpacity style={styles.button1} onPress={this.onSubmit.bind(this)}>
      //           <Text style={styles.submitText}> SUMBIT</Text>
      //         </TouchableOpacity>

      //       </View>
      //     </View>
      //   </ScrollView>
      // </KeyboardAvoidingView>


      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView>
      <View style={styles.container}>
      {/* <Text style={styles.CEtitle}> New Event </Text> */}
      <Text style={styles.textBox}>Upload Image:</Text>
      <Image style={styles.avatar} source={require('../assets/Gary.jpg')}/>
      <View>
        <Text style={styles.textBox}>Title:</Text>
        <TextInput
        //maxLength={35}
          event={this.state.event}
          keyboardType = 'default'
          onChangeText={(event) => this.setState({event})}
          placeholder='Event Title'
          placeholderTextColor='gray'
          style={styles.input}
        />

        <Text style={styles.textBox}>Description:</Text>
        <TextInput
          description={this.state.description}
          multiline
          keyboardType = 'default'
          onChangeText={(description) => this.setState({description})}
          placeholder='What is your event about?'
          placeholderTextColor='gray'
          style={styles.description}
        />

        <Text style={styles.textBox}>Date:</Text>
        <DatePicker
          style={{width: 150}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={require('../assets/calendar.png')}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,},
            dateInput: {
              marginLeft: 40
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        
        <Text style={styles.textBox}>Time:</Text>
        <DatePicker
          style={{width: 150}}
          // date={this.state.time}
          date={this.state.time}
          mode="time"
          placeholder="select time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={10}
          iconSource={require('../assets/time.png')}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 3
            },
            dateInput: {
              marginLeft: 39
            }
          }}
          onDateChange={(time) => {this.setState({time: time})}}
        />

        <Text style={styles.textBox}>Location:</Text>
        <TextInput
          //maxLength={25}
          value={this.state.location}
          keyboardType = 'default'
          onChangeText={(location) => this.setState({ location })}
          placeholder='E.g. 9500 Gilman Dr'
          placeholderTextColor='gray'
          style={styles.input}
        />

		    <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
					<Icon1 name={'ios-bookmark'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
					<TextInput
						style={styles.loginInput}
						editable = {false}
						defaultValue={'Category'}
						color = 'gray'
				/>
				</View>

				<TagSelect
					data = {data}
					itemStyleSelected = {{opacity: 0.5, backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1}}
					containerStyle = {{marginLeft: 60, marginRight: 50}}
					ref = {(tag)=>{this.tag = tag}}
				/>
        
        <TouchableOpacity
          style={styles.button1}
          onPress={this.onSubmit.bind(this)}
        >
          <Text style={styles.submitText}> SUBMIT </Text>
        </TouchableOpacity>
      </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
      )
    }  
}