import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, TouchableHighlight, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createStackNavigator,NavigationActions  } from 'react-navigation';
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import firebase from 'react-native-firebase';

var temp = require('../src/MyEvents');

export default class EventDetail_Host extends Component {
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
        this.setup()
    }

    static navigationOptions = {
        title: 'Event Detail',
        headerLeft:null,
        gesturesEnabled: false,

    };

    handleOnNavigateBack=() => {this.componentWillMount()}

    componentWillMount() {
        this.setup()
    }

    async setup() {
        // alert("fneihfei")
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
        }.bind(this));

        await firebase.database().ref('Users/').child(uid).once('value', function(snapshot) {
            this.setState({email: snapshot.val().email});
            this.setState({interest: snapshot.val().interest});
            this.setState({uid: snapshot.val().uid});
            this.setState({name: snapshot.val().name});
            this.setState({numberOfEvents: snapshot.val().numberOfEvents});
            if (snapshot.val().ListOfFavorite != null)
              this.setState({buffer: snapshot.val().ListOfFavorite});
            if (snapshot.val().ListOfAttending != null)
              this.setState({buffer_2: snapshot.val().ListOfAttending});
        }.bind(this));

        if (this.state.buffer.includes(data.key)) {
          this.setState({value_color2:"#E3170D"});
        }
        if (this.state.buffer_2.includes(data.key)) {
          this.setState({value_color1:"#E3170D"});
        }
    }

    deleteEvent() {
        firebase.database().ref('Events/').child(this.superData.key).remove();
        this.props.navigation.reset([NavigationActions.navigate({routeName: 'Home'})], 0)
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView>
                    <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 30, marginRight: 30}}>
                        <ResponsiveImage style = {{height: 100, width: 150, margin: 20}} source={require('../assets/event.jpg')}/>
                        <View>
                            <Text style={styles.title}>{this.state.eventName}</Text>

                            <Text style={styles.textBox}>Description:</Text>
                            <Text style={styles.contents}>{this.state.description}</Text>

                            <Text style={styles.textBox}>Date:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                                <Icon name={"calendar"} size={26} color={"#E3170D"} style={{flex: 1}}/>
                                <Text style={{fontSize: 18, alignItems: 'center', justifyContent: 'center', flex: 6}}>
                                    {this.state.date}
                                </Text>
                            </View>

                            <Text style={styles.textBox}>Time:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                                <Icon name={"clock"} size={26} color={"#E3170D"} style={{flex: 1}}/>
                                <Text style={{fontSize: 18, alignItems: 'center', justifyContent: 'center', flex: 6}}>{this.state.time}</Text>
                            </View>

                            <Text style={styles.textBox}>Location:</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                                <Icon name={"location"} size={26} color={"#E3170D"} style={{flex: 1}}/>
                                <Text style={{fontFamily: 'Avenir', fontSize:18, alignItems: 'center', justifyContent: 'center', flex: 6}}>{this.state.location}</Text>
                            </View>
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
                                color={'gray'}
                                onPress={() => {this.deleteEvent()}}
                                name={"ios-trash"}
                                size={30}
                            />
                        </View>

                        <View style={{marginRight: 0, marginTop: -5}}>
                            <Icon2
                                color={'gray'}
                                onPress={() => {this.props.navigation.navigate('ModifyEvent', {onNavigateBack: this.handleOnNavigateBack, data: this.superData})}}
                                name={"edit"}
                                size={30}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    textBox: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },

    contents: {
        fontFamily: 'Avenir',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:30,
    },

    title: {
        fontFamily: 'Avenir',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:30,
        fontWeight: 'bold',
    },
});