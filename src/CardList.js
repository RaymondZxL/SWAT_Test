import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import EventCard from '../src/EventCard';
import Styles from './Styles';

var data = [{key: '0', title: 'SDHacks', image:'../assets/SDHacks.jpg', date: '2018', location: 'pc'}]
// var data = [{key: '0', title: 'SDHacks', image: '../assets/SDHacks.jpg', date: '2018', location: 'pc'},
//             {key: '1', title: 'midterm', image: '../assets/SDHacks.jpg', date: '2017', location: 'home'},
//             {key: '2', title: 'writing code', image: '../assets/SDHacks.jpg', date: '2020', location: 'universal'}]
export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    
  }

  renderItemView({item, index}) {
    const {navigation}=this.props
    return (
      <EventCard data={item} navigation={navigation}/>
    )
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <FlatList
            data={data}
            renderItem={this.renderItemView.bind(this)}/>
      </View>
    )
  }
}