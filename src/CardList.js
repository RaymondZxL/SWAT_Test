import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import EventCard from '../src/EventCard';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    
  }

  renderItemView({item, index}) {
    const {navigation}=this.props
    const {hosting} =this.props
    return (
      <EventCard hh = {new Date()} data={item} index={index} navigation={navigation} hosting={hosting} handleOnNavigateBack={this.props.handleOnNavigateBack}/>
    )
  }
  render() {
    const {data} = this.props
    // alert(data)
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <FlatList
            data={data}
            // hosting={hosting}
            renderItem={this.renderItemView.bind(this)}/>
      </View>
    )
  }
}