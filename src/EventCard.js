import React, {Component} from 'react';
import {Card, ListItem, Text} from 'react-native-elements'
import {TouchableOpacity, View, Button} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';
import styles from './Styles'

export default class EventCard extends Component {

  constructor(props) {
    super(props);
    this.state={}
  } 
  render() {
    // const {
    //   name,name
    //   location,
    //   description,
    //   date,
    //   time,
    //   image,
    //   likes,
    //   id
    // } = this.props.event
    const {title, image, date, location} = this.props.data

    return (
      <Card
        image={require('../assets/SDHacks.jpg')}
        // image={require({image})}
        imageProps={{resizeMode: 'stretch'}}
        imageStyle={{marginLeft:0, marginRight:0}}
      >
        <Text style={{marginBottom:10, marginTop:5, fontSize:20, fontWeight: 'bold'}}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginLeft: 0, marginBottom: 5}}>
            <Icon name='calendar' size={22}/>
            <Text style={{fontSize: 15}}>{date}</Text>
          </View> 
          <View style={{flexDirection: 'row', marginLeft: 20, marginBottom: 5}}>
            <Icon name='location' size={22}/>
            <Text style={{fontSize: 15}}>{location}</Text>
          </View>
        </View>
        {/* <View style={{flexDirection: 'row', marginLeft: 0, marginBottom: 5}}>
          <Icon name='user' size={22}/>
          <Text style={{fontSize: 15}}>Organization</Text>
        </View>  */}
        {/* <Text style={{marginBottom: 10}}>SDHACK GOOD</Text> */}
        <TouchableOpacity

          style={styles.button1}
          onPress={()=>{this.props.navigation.navigate('EventDetail')}}
        >
          <Text style={styles.buttonText}>View Detail</Text>
        </TouchableOpacity>

     </Card>
    )
  }
}