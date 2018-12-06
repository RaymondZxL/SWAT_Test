import React, { Component } from 'react';
import { Keyboard, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions, Header } from 'react-navigation';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/Ionicons';
import { TagSelect } from "react-native-tag-select";

const { width: WIDTH } = Dimensions.get('window');
const data = [
    { id: 1, label: 'Arts & Crafts' },
    { id: 2, label: 'Business & Tech' },
    { id: 3, label: 'Fairs & Festivals' },
    { id: 4, label: 'Food & Dining' },
    { id: 5, label: 'Dance' },
    { id: 6, label: 'Gaming' },
    { id: 7, label: 'Music' },
    { id: 8, label: 'Sports' },
    { id: 9, label: 'Study' },
    { id: 10, label: 'Other' },
];

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            description: '',
            date: '',
            time: '',
            location: '',
            tag: null,
            dateTime: date + ' ' + time,
            maxCapacity: null
        }
    }

    static navigationOptions={
        title: 'Add Event',
        headerLeft: null
    };

    async onSubmit() {
        if (this.state.event === "") {
            alert('Please enter valid name!');
            return;
        }
        if (this.state.description === "") {
            alert('Please enter description');
            return;
        }
        if (this.state.dateTime === "") {
            alert('Please select date and time');
            return;
        }
        if (this.state.location === "") {
            alert('Please enter valid location');
            return;
        }
        if (this.tag.totalSelected == 0) {
            alert('Please select at least one category');
            return;
        }
        if (!this.state.maxCapacity) {
            this.state.maxCapacity = Number.MAX_VALUE
        }

        let i;
        for (i = 0 ; i < 10; i++) {
            this.state.date += this.state.dateTime[i];
        }

        let j;
        for (j = 11; j < 16; j++) {
            this.state.time += this.state.dateTime[j];
        }

        user = firebase.auth().currentUser;
        if (user != null) {
            var numberOfEvents = 0;
            await firebase.database().ref('Events').once('value', function(snapshot) {
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
                maxCapacity: this.state.maxCapacity,
                favoriteNum: 0
            }).then((data)=>{
                this.props.navigation.reset([NavigationActions.navigate({routeName: 'Home'})], 0);
                alert('Event Created Successfully!');
            }).catch((error)=>{
                console.log('error ', error);
                return;
            });

            eventN = numberOfEvents;
            numberOfEvents += 1;

            await firebase.database().ref('Events').child('NumberOfEvents').set({numberOfEvents});
		}
	}

	async onChange(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                if (!(newText == '' && text[i] == 0))
                    newText = newText + text[i];
            }
            else {
                alert('Please enter an integer');
                return;
            }
        }
        var integer = parseInt(newText, 10);
        this.setState({maxCapacity: integer})
    }

    render() {
        return(
            <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT + 20} style={{flex: 1}} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <View style={styles.container1}>
                            <TouchableOpacity style={{margin: 10, padding: 10, alignItems: 'center'}} onPress={this.myfun}>
                                <Icon name={'ios-radio-button-off'} style={{opacity: 0.7, color: 'gray'}} size={130}/>
                                <Icon name={'ios-camera'} style={{opacity: 0.7, color: 'gray', position: 'absolute', marginTop: 55}} size={40}/>
                            </TouchableOpacity>

                            <View style={{justifyContent: 'space-around'}}>
                                <Text style={{color: '#cc0f0f', fontWeight: 'bold', fontFamily: 'Avenir', marginTop: -20}}>Event Name</Text>
                                <TextInput
                                    style={styles.eventInput}
                                    event={this.state.event}
                                    keyboardType='default'
                                    onChangeText={(event) => this.setState({ event })}
                                    borderBottomColor='#D3D3D3'
                                    borderBottomWidth={2}
                                    maxLength={50}
                                />
                            </View>

                            <Text style={{color: '#cc0f0f', fontWeight: 'bold', marginTop: 5, width: WIDTH - 100, fontFamily: 'Avenir'}}>Time</Text>
                            <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                                <Icon name={'ios-arrow-down'} style={{color: '#D3D3D3', position: 'absolute', marginLeft: WIDTH - 150, marginTop: 12}} size={15}/>
                                <DatePicker
                                    style={{width: WIDTH - 100, height: 45}}
                                    date={this.state.dateTime}
                                    mode="datetime"
                                    placeholder="Select Date and Time"
                                    placeholderTextColor='gray'
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="Confirm"
                                    minDate={new Date()}
                                    cancelBtnText="Cancel"
                                    borderBottomColor='#D3D3D3'
                                    borderBottomWidth={2}
                                    showIcon={false}
                                    minuteInterval={5}
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
                                    onDateChange={(dateTime) => {this.setState({dateTime: dateTime})}}
                                />
                            </View>

                            <View style={{justifyContent: 'space-around'}}>
                                <Text style={{color: '#cc0f0f', fontWeight: 'bold', fontFamily: 'Avenir'}}>Location</Text>
                                <TextInput
                                    style={styles.eventInput}
                                    value={this.state.location}
                                    keyboardType='default'
                                    onChangeText={(location) => this.setState({ location })}
                                    borderBottomColor='#D3D3D3'
                                    borderBottomWidth={2}
                                />
                            </View>

                            <View style={{justifyContent: 'space-around'}}>
                                <Text style={{color: '#cc0f0f', fontWeight: 'bold', marginTop: 5, marginBottom: 5, fontFamily: 'Avenir'}}>Description</Text>
                                <TextInput
                                    style={styles.descriptionInput}
                                    value={this.state.description}
                                    keyboardType='default'
                                    onChangeText={(description) => this.setState({ description })}
                                    borderColor='#D3D3D3'
                                    borderWidth={2}
                                    borderRadius={5}
                                    multiline={true}
                                />
                            </View>

                            <Text style={{color: '#cc0f0f', fontWeight: 'bold', marginTop: 5, width: WIDTH - 100, marginBottom: 5, fontFamily: 'Avenir'}}>Categories</Text>
                            <TagSelect
                                data={data}
                                itemStyleSelected={{opacity: 0.5, backgroundColor: 'gray', borderColor: 'gray', borderWidth: 1}}
                                containerStyle={{marginLeft: 60, marginRight: 50}}
                                ref={(tag)=>{this.tag = tag}}
                            />

                            <View style={{justifyContent: 'space-around'}}>
                                <Text style={{color: '#cc0f0f', fontWeight: 'bold', fontFamily: 'Avenir'}}>Max Capacity</Text>
                                <TextInput
                                    style={styles.eventInput}
                                    keyboardType='numeric'
                                    placeholder="(optional)"
                                    placeholderTextColor='gray'
                                    onChangeText={(maxCapacity) => this.onChange(maxCapacity)}
                                    value={this.state.maxCapacity}
                                    borderBottomColor='#D3D3D3'
                                    borderBottomWidth={2}
                                />
                            </View>

                            <TouchableOpacity style={styles.button1} onPress={this.onSubmit.bind(this)}>
                                <Text style={styles.submitText}>Create</Text>
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
        fontFamily: 'Avenir',
    },

    eventInput: {
        width: WIDTH - 100,
        height: 45,
        fontSize: 16,
        paddingLeft: 5,
        fontFamily: 'Avenir',
    },
});