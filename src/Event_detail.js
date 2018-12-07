import React, { Component } from 'react';
import {Dimensions, Alert, Button, Text, TouchableOpacity, TextInput, TouchableHighlight, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import resolveAssetSource from 'resolveAssetSource'
const {width: WIDTH} = Dimensions.get('window')

export default class EventDetail extends Component {
    constructor(props) {
        super(props);
        this.superData=this.props.navigation.getParam('data', 'None');
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
            maxCapacity: '',
            rsvpNum: '',
            edit: false
        }
    }

    static navigationOptions={
        title: 'Event',
        headerLeft: null,
        gesturesEnabled: false,
    };

    async componentWillMount() {
        var data = this.props.navigation.getParam('data', 'None');
        var uid = firebase.auth().currentUser.uid;
        await firebase.database().ref('Events/').child(data.key).once('value', function(snapshot) {
            this.setState({user: snapshot.val().user});
            this.setState({time: snapshot.val().time});
            this.setState({eventName: snapshot.val().eventName});
            this.setState({description: snapshot.val().description});
            this.setState({location: snapshot.val().location});
            this.setState({date: snapshot.val().date});
            this.setState({buffer_cata: snapshot.val().category});
            this.setState({favoriteNum: snapshot.val().favoriteNum});
            if (this.state.favoriteNum == null) {
                this.setState({favoriteNum: 0});
            }
            this.setState({maxCapacity: snapshot.val().maxCapacity})
            this.setState({rsvpNum: snapshot.val().rsvpNum})
            if (this.state.rsvpNum == null) {
                this.setState({rsvpNum: 0})
            }
        }.bind(this));

        await firebase.database().ref('Users/').child(uid).once('value', function(snapshot) {
            this.setState({email: snapshot.val().email});
            this.setState({interest: snapshot.val().interest});
            this.setState({uid: snapshot.val().uid});
            this.setState({name: snapshot.val().name});
            this.setState({numberOfEvents: snapshot.val().numberOfEvents});
            if (snapshot.val().ListOfFavorite != null)
                this.setState({buffer: snapshot.val().ListOfFavorite});
            if(snapshot.val().ListOfAttending != null)
                this.setState({buffer_2: snapshot.val().ListOfAttending});
        }.bind(this));

        if (this.state.buffer.includes(data.key)) {
            this.setState({value_color2:"#E3170D"});
        }
        if (this.state.buffer_2.includes(data.key)) {
            this.setState({value_color1:"#E3170D"});
        }else {
            // alert(this.state.maxCapacity)
            if (this.state.rsvpNum == this.state.maxCapacity) {
                this.setState({edit: true})
            }
        }
    }

    async onSubmit_like() {
        var data = this.props.navigation.getParam('data', 'None');
        var uid = firebase.auth().currentUser.uid;

        if (this.state.value_color2 === 'grey') {
            this.state.buffer.push(data.key);
            this.state.favoriteNum += 1;
        } else {
            var i = this.state.buffer.indexOf(data.key);
            var removedItem = this.state.buffer.splice(i, 1);
            this.state.favoriteNum -= 1;
        }
        this.setState({favoriteNum: this.state.favoriteNum})

        await firebase.database().ref('Events/').child(data.key).set({
            user: this.state.user,
            time: this.state.time,
            eventName: this.state.eventName,
            description: this.state.description,
            location: this.state.location,
            date: this.state.date,
            category: this.state.buffer_cata,
            favoriteNum: this.state.favoriteNum,
            maxCapacity: this.state.maxCapacity,
            rsvpNum: this.state.rsvpNum
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
            console.log('data ', data)
        }).catch((error)=>{
            console.log('error ', error)
        });
        this.state.value_color2 === 'grey' ? this.setState({value_color2:"#E3170D"}): this.setState({value_color2:'grey'})
    }

    async onSubmit_attend() {
        var data = this.props.navigation.getParam('data', 'None');
        var uid = firebase.auth().currentUser.uid;

        if (this.state.value_color1 === 'grey') {
            this.state.buffer_2.push(data.key);
            this.state.rsvpNum += 1;

        } else {
            var i = this.state.buffer_2.indexOf(data.key);
            var removedItem = this.state.buffer_2.splice(i, 1);
            this.state.rsvpNum -= 1;
        }
        this.setState({rsvpNum: this.state.rsvpNum})

        await firebase.database().ref('Events/').child(data.key).set({
            user: this.state.user,
            time: this.state.time,
            eventName: this.state.eventName,
            description: this.state.description,
            location: this.state.location,
            date: this.state.date,
            category: this.state.buffer_cata,
            favoriteNum: this.state.favoriteNum,
            maxCapacity: this.state.maxCapacity,
            rsvpNum: this.state.rsvpNum
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
            console.log('data ' , data)
        }).catch((error)=>{
            console.log('error ' , error)
        });
        this.state.value_color1 === 'grey' ? this.setState({value_color1:"#E3170D"}): this.setState({value_color1:'grey'})
    }

    renderButtons = () => {
        const buttons = [];
        for (let i = 0; i < this.state.buffer_cata.length; i++) {
            buttons.push(
                <TouchableOpacity
                    disabled={true}
                    onPress = {() => {}}
                    key={i}
                    style={{backgroundColor: '#cc0f0f', borderColor: '#cc0f0f', opacity: 0.5, borderRadius: 30, borderWidth: 10, marginBottom: 5, marginRight: 5, alignItems: 'flex-start'}}
                >
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.state.buffer_cata[i].label}</Text>
                </TouchableOpacity>
            )
        }
        return buttons;
    };

    render() {
        let pic = require('../assets/event.jpg');
        let s = resolveAssetSource(pic);
        let w = s.width;
        let h = s.height;
        let space = '   ';

        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
                        <ResponsiveImage style = {{height: h*(WIDTH/w), width: WIDTH}} source={require('../assets/event.jpg')}/>
                        <View style={{marginLeft: 30, marginRight: 30}}>
                            <Text style={styles.title}>{this.superData.eventName}</Text>

                            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
                                {this.renderButtons()}
                            </View>

                            <Text style={styles.textBox}>INFO</Text>
                            <View style={{marginBottom: 15}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Icon name={"clock"} size={20}/>
                                    <Text style={{fontFamily: 'Avenir', fontSize: 15}}>{this.superData.date}</Text>
                                    <Text>{space}</Text>
                                    <Text style={{fontFamily: 'Avenir', fontSize: 15}}>{this.superData.time}</Text>

                                    <Icon style={{marginLeft: 25}} name={"tag"} size={20}/>
                                    <Text style={{fontFamily: 'Avenir', fontSize: 15}}>$</Text>
                                </View>
                                <View style={{marginTop: 5, flexDirection: 'row'}}>
                                    <Icon name={"location"} size={20}/>
                                    <Text style={{flexWrap: 'wrap', fontFamily: 'Avenir', fontSize: 15}}>{this.superData.location}</Text>
                                </View>
                            </View>

                            <Text style={styles.textBox}>DESCRIPTION</Text>
                            <Text style={styles.contents}>{this.superData.description}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginLeft: 30, marginRight: 30, marginBottom: 20, backgroundColor: '#fff'}}>
                        <Icon1
                            color={'gray'}
                            name={"ios-arrow-back"}
                            size={35}
                            onPress={()=>{this.props.navigation.state.params.onNavigateBack(); this.props.navigation.goBack()}}
                        />

                        <View style={{flex: 1, marginLeft: 180, marginTop: 2}}>
                            <Icon1
                                color={this.state.value_color2}
                                onPress={this.onSubmit_like.bind(this)}
                                name={"md-heart"}
                                size={30}
                            />
                        </View>

                        <View style={{marginRight: 0, marginTop: -5}}>
                            <Button color={this.state.value_color1}
                                title={'RSVP'}
                                buttonStyle={{backgroundColor: "rgba(92, 99,216, 1)"}}
                                onPress={this.onSubmit_attend.bind(this)}
                            >
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },

    textBox: {
        fontFamily: 'Avenir',
        fontSize: 15,
        fontWeight: 'bold',
    },

    contents: {
        fontFamily: 'Avenir',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:30,
    },

    title: {
        fontFamily: 'Avenir',
        fontSize: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
}); 