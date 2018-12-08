import React, { Component } from 'react';
import { Card, Text } from 'react-native-elements';
import { TouchableOpacity, View, Button, Dimensions } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from 'react-native-firebase';

const { width:WIDTH } = Dimensions.get('window');

export default class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteNum: 0
        }
    }

    componentWillReceiveProps() {
        this.componentWillMount()
    }

    async componentWillMount() {
        await firebase.database().ref('Events/').child(this.props.data.key).once('value', function(snapshot) {
            this.setState({favoriteNum: snapshot.val().favoriteNum})
        }.bind(this))
    }

    render() {
        const {key, eventName, time, location} = this.props.data;
        let changeColor = this.props.index;

        date = this.props.data.date;
        if (!date) {
            date="2018-11-10"
        }

        var s = date.split('-');
        let outStr = "";
        if (s[1] == "01")
            outStr = "JAN";
        else if (s[1] == "02")
            outStr = "FEB";
        else if (s[1] == "03")
            outStr = "MAR";
        else if (s[1] == "04")
            outStr = "APR";
        else if (s[1] == "05")
            outStr = "MAY";
        else if (s[1] == "06")
            outStr = "JUN";
        else if (s[1] == "07")
            outStr = "JUL";
        else if (s[1] == "08")
            outStr = "AUG";
        else if (s[1] == "09")
            outStr = "SEP";
        else if (s[1] == "10")
            outStr = "OCT";
        else if (s[1] == "11")
            outStr = "NOV";
        else
            outStr = "DEC";

        return (
            <TouchableOpacity
                onPress={()=>{this.props.hosting?
                    this.props.navigation.navigate('EventDetail_Host', {onNavigateBack: this.props.handleOnNavigateBack, data: this.props.data}):
                    this.props.navigation.navigate('EventDetail', {onNavigateBack: this.props.handleOnNavigateBack,data: this.props.data})}}
            >
                <Card flexDirection='row' containerStyle={{padding: 0, height: 150}}>
                    <View style={{backgroundColor: changeColor%2 == 0 ? '#cc0f0f' : '#060719', opacity: 0.7, height: 148, width: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontSize: 40}}>{s[2]}</Text>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, fontFamily: 'Avenir'}}>{outStr}</Text>
                    </View>

                    <View style={{marginTop: 10, marginLeft: 10, width: WIDTH - 150, height: 150}}>
                        <View style={{height: 110}}>
                            <Text style={{fontWeight: 'bold', fontFamily: 'Avenir', flexWrap: 'wrap'}}>{eventName}</Text>
                            <View style={{marginTop: 10, flexDirection: 'row'}}>
                                <Icon name={"clock"} size={20}/>
                                <Text style={{fontFamily: 'Avenir'}}>{time}</Text>
                            </View>

                            <View style={{marginTop: 5, flexDirection: 'row'}}>
                                <Icon name={"location"} size={20}/>
                                <Text style={{flexWrap: 'wrap', fontFamily: 'Avenir'}}>{location}</Text>
                            </View>
                        </View>

                        <View style={{left: WIDTH-180, bottom: 0, flexDirection: 'row'}}>
                            <Icon1
                                name={"md-heart"}
                                size={20}
                                color='#cc0f0f'
                            />
                            <Text style={{fontFamily: 'Avenir', color: '#cc0f0f', marginLeft: 3}}>{this.state.favoriteNum}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
}