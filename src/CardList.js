import React, {Component} from 'react';
import {Dimensions, View, FlatList} from 'react-native';
import EventCard from '../src/EventCard';
import ResponsiveImage from 'react-native-responsive-image';


const {width: WIDTH} = Dimensions.get('window');
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
  // renderFooter = ()=>{
  //   if (data.length == 0) return null
  //   const {navigation} = this.props
  //   const {hosting} = this.props
  //   return (
  //     <EventCard hh = {new Date()} data={item} index={index} navigation={navigation} hosting={hosting} handleOnNavigateBack={this.props.handleOnNavigateBack}/>
  //   )
  // }
  render() {
    const {data} = this.props
    // alert(data)
    console.log(data)
    // console.log(data.length)
    // alert(data.length)
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
      {/* <FlatList
            data={data}
            // hosting={hosting
            renderItem={this.renderItemView.bind(this)}/>   */}
       {data.length ?
        <FlatList
            data={data}
            // hosting={hosting
            renderItem={this.renderItemView.bind(this)}/> : 
        <View style={{flex:1, blackgroundColor: 'white'}}/>
        }
        
      </View>
    )
  }
}