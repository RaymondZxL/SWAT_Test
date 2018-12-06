import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import ResponsiveImage from 'react-native-responsive-image';

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
            value_color: 'gray'
        };
        this.setup();
    }

    static navigationOptions = {
        title: 'Profile',
    };

    handleOnNavigateBack = () => {
        this.componentWillMount()
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
	}
	renderButtons  = () => {
	    const buttons = [];
	    for (let i = 0; i < this.state.interest.length; i++) {
            // alert(this.state.interest[i].key)
            buttons.push(
                <TouchableOpacity
                    disabled={true}
                    onPress = {() => {}}
                    key={i}
                    style={{backgroundColor: 'gray', opacity: 0.3, borderRadius: 5, borderWidth: 10, marginTop: 20, borderColor: 'gray', alignItems: 'center'}}
                >
                    <Text style={{color: 'white'}}>{this.state.interest[i].label}</Text>
                </TouchableOpacity>
            )
        
        return buttons;
    };

	render() {
        return (
            <View style={styles.container}>
                <ResponsiveImage
                    style={{height:150, width:150, margin:20}}
                    source={require('../assets/Gary.jpg')}
                />

                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.state.name}</Text>

                <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
                    <Icon name={'ios-mail'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
                    <TextInput
                        style={styles.loginInput}
                        editable={false}
                        defaultValue = {this.state.email}
                        color={'black'}
                    />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <Icon name={'ios-bookmark'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
                    <TextInput
                        style={styles.loginInput}
                        editable={false}
                        defaultValue={'Interests'}
                        color='black'
                    />
                </View>

                <View>
                    {this.renderButtons()}
                </View>

				<Icon
                    color={this.state.value_color}
					onPress={()=>{
                        // this.props.navigation.reset([NavigationActions.navigate({routeName:'ChangeProfile'})], 0)}}
                        this.props.navigation.navigate('ChangeProfile', {onNavigateBack: this.handleOnNavigateBack})}}
                    name = {"ios-create"}
                    size={35}
                    style={{marginLeft: 250, right: 10}}
				/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },

    loginInput: {
        width: WIDTH - 150,
        height: 45,
        fontSize: 16,
        paddingLeft: 10,
        marginHorizontal: 25,
    },
});