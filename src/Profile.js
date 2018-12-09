import React, { Component } from 'react';
import {ScrollView, Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import ResponsiveImage from 'react-native-responsive-image';
import CardList from '../src/CardList'

const {width: WIDTH} = Dimensions.get('window');

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

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            uid: '',
            interest: [],
            value_color: 'gray',
            buffer_host: [],
        };
    }

    static navigationOptions = {
        title: 'Profile',
    };

    componentWillReceiveProps() {
        this.setup()
      }
    handleOnNavigateBack = () => {
        this.setup()
    }
	componentWillMount() {
		this.setup()
	}

	async setup() {
		var user = firebase.auth().currentUser;
		if (user != null) {
		    await firebase.database().ref('Users/').child(user.uid).once('value').then(function(snapshot) {
		        this.setState({name: snapshot.val().name});
		        this.setState({interest: snapshot.val().interest});
		        this.setState({email: snapshot.val().email})
			}.bind(this))
        }

        this.setState({buffer_host: []})
        buffer_host = []

        await firebase.database().ref('Events').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
              if (childSnapshot.key != "NumberOfEvents") {
      
                //this.setState({event:childSnapshot.val().eventName})
                if(childSnapshot.val().user === user.email){
                  buffer_host.push({
                  // key: childSnapshot.val().key,
                    key: childSnapshot.key,
                    date:childSnapshot.val().date,
                    description:childSnapshot.val().description,
                    eventName:childSnapshot.val().eventName,
                    location:childSnapshot.val().location,
                    time:childSnapshot.val().time,
                    user:childSnapshot.val().user,
                    category:childSnapshot.val().category,
                    favoriteArray:childSnapshot.val().favoriteArray,
                    attending:childSnapshot.val().attending,
                  })
                }
              }
            }.bind(this))
          }.bind(this))
          this.setState({buffer_host: buffer_host})
	}

	renderButtons = () => {
	    const buttons = [];
	    for (let i = 0; i < this.state.interest.length; i++) {
            buttons.push(
                <TouchableOpacity
                    disabled={true}
                    onPress = {() => {}}
                    key={i}
                    style={{backgroundColor: '#f4f6f7', borderRadius: 5, borderWidth: 10, marginBottom: 5, marginLeft: 10, marginRight: 5, borderColor: '#f4f6f7', alignItems: 'flex-start'}}
                >
                    <Text style={{color: 'black'}}>{this.state.interest[i].label}</Text>
                </TouchableOpacity>
            )
        }
        return buttons;
    };

	render() {
        const {navigation} = this.props
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{justifyContent:'space-around', alignItems: 'center'}}>
                        <ResponsiveImage
                            style={{height: 150, width: 150, margin: 20}}
                            source={require('../assets/profile.png')}
                        />
                    </View>

                    <View style={{flexDirection: 'row',  justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.state.name}</Text>
                        <Icon
                            color={this.state.value_color}
                            onPress={()=>{
                                this.props.navigation.navigate('ChangeProfile', {onNavigateBack: this.handleOnNavigateBack})}}
                            name = {"md-create"}
                            size={20}
                            style={{marginTop: 6, padding: 10}}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Icon name={'ios-mail'} size={20} style={{opacity:0.5, left: WIDTH*0.05, marginTop: 12}}/>
                        <TextInput
                            style={styles.loginInput}
                            editable={false}
                            defaultValue={this.state.email}
                            color={'black'}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Icon name={'ios-bookmark'} size={20} style={{opacity:0.5, left: WIDTH*0.06, marginTop: 12}}/>
                        <TextInput
                            style={styles.loginInput2}
                            editable={false}
                            defaultValue={'Interests'}
                            color='black'
                        />
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 35, marginBottom: 5}}>
                        {this.renderButtons()}
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Icon name={'md-calendar'} size={20} style={{opacity:0.5, left: WIDTH*0.06, marginTop: 12}}/>
                        <TextInput
                            style={styles.loginInput3}
                            editable={false}
                            defaultValue={'Hosting List'}
                            color='black'
                        />
                    </View>

                    <CardList navigation={navigation} data={this.state.buffer_host} hosting={true} handleOnNavigateBack={this.handleOnNavigateBack}/>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },

    loginInput: {
        width: WIDTH - 150,
        height: 45,
        fontFamily: 'Avenir',
        fontSize: 16,
        paddingLeft: 5,
        marginHorizontal: 25,
    },

    loginInput2: {
        width: WIDTH - 150,
        height: 45,
        fontFamily: 'Avenir',
        fontSize: 16,
        paddingLeft: 12,
        marginHorizontal: 25,
    },

    loginInput3: {
        width: WIDTH - 150,
        height: 45,
        fontFamily: 'Avenir',
        fontSize: 16,
        paddingLeft: 9,
        marginHorizontal: 25,
    },
});