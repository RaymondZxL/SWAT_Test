import React, {Component} from 'react';
import {ScrollView, FlatList,Text, TouchableWithoutFeedback, StyleSheet, View,TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-search-bar'
import {Dimensions, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Menu, {MenuItem,MenuDivider} from 'react-native-material-menu';
import CardList from '../src/CardList';
import firebase from 'react-native-firebase';

import MyEvents from '../src/MyEvents';

const dismissKeyboard = require('dismissKeyboard')
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      color: 'grey',
      data: [],
      eventArray: [],
      sortByTime: 0,
      sortByPop: 0,
      Timebuffer: [],
      Popbuffer: [],
      temp: [],
    };
    // setup = this.setup.bind(this)
    // this.setup()
  }

  componentWillReceiveProps() {
    this.setup()
  }
 componentWillMount(){ 
  // componentWillMount() {
    this.setup()
    //this.refs.searchBar.focus();
  }

 //componentDidMount() {
  //this.refs.searchBar.focus();
//}
  async setup() {
// await setup() {
    //store all events into array
    eventArray = []
    Timebuffer = []
    Popbuffer = []
    await firebase.database().ref('Events').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {
          // this.setState({event:childSnapshot.val().eventName})
          eventArray.push({
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
            favoriteNum: childSnapshot.val().favoriteNum,
            attending:childSnapshot.val().attending,
          })
        }
      })
    })
    await firebase.database().ref('Events').orderByChild('date').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {
          // this.setState({event:childSnapshot.val().eventName})
          Timebuffer.push({
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
            favoriteNum: childSnapshot.val().favoriteNum,
            attending:childSnapshot.val().attending,
          })
        }
      })
    })
    await firebase.database().ref('Events').orderByChild('favoriteNum').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {
          // this.setState({event:childSnapshot.val().eventName})
          Popbuffer.push({
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
            favoriteNum: childSnapshot.val().favoriteNum,
            attending:childSnapshot.val().attending,
          })
        }
      })
    })
    // alert(this.state.eventArray)
    console.log(this.state.eventArray)
    this.setState({eventArray: eventArray})
    this.setState({Timebuffer: Timebuffer})
    this.setState({Popbuffer: Popbuffer})
  }
  
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  onButtonPress = () => {
    this.setState({ color: '#E3170D' }); 
  }

  async info(){
    //alert(this.state.value)
    this.setState({eventArray:[]})
    this.setState({Timebuffer:[]})
    this.setState({Popbuffer:[]})
    await firebase.database().ref('Events').orderByChild('date').once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if (childSnapshot.key != "NumberOfEvents") {
            // this.setState({event:childSnapshot.val().eventName})
            var eventNameInclude = false;
            var descriptionInclude = false;
            var tagInclude = false;
  
            eventNameInclude = childSnapshot.val().eventName.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1 ? true : false;
            descriptionInclude = childSnapshot.val().description.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1 ? true : false;
            for(var i = 0; i < childSnapshot.val().category.length; i++){
              //alert(childSnapshot.val().category[i].label.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()));
              if((childSnapshot.val().category[i].label.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1)){
                tagInclude = true;
                break;
              }else{
                tagInclude = false;
              }
            }
            if(tagInclude || eventNameInclude || descriptionInclude){
                      this.state.Timebuffer.push({
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
                      favoriteNum: childSnapshot.val().favoriteNum,
                      attending:childSnapshot.val().attending,
                    })
                    //alert(childSnapshot.val().category);
              }
        }
        }.bind(this))
      }.bind(this))
      await firebase.database().ref('Events').orderByChild('favoriteNum').once('value').then(function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if (childSnapshot.key != "NumberOfEvents") {
              // this.setState({event:childSnapshot.val().eventName})
              var eventNameInclude = false;
              var descriptionInclude = false;
              var tagInclude = false;
    
              eventNameInclude = childSnapshot.val().eventName.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1 ? true : false;
              descriptionInclude = childSnapshot.val().description.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1 ? true : false;
              for(var i = 0; i < childSnapshot.val().category.length; i++){
                //alert(childSnapshot.val().category[i].label.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()));
                if((childSnapshot.val().category[i].label.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1)){
                  tagInclude = true;
                  break;
                }else{
                  tagInclude = false;
                }
              }
              if(tagInclude || eventNameInclude || descriptionInclude){
                        this.state.Popbuffer.push({
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
                        favoriteNum: childSnapshot.val().favoriteNum,
                        attending:childSnapshot.val().attending,
                      })
                      //alert(childSnapshot.val().category);
                }
          }
          }.bind(this))
        }.bind(this))
      await firebase.database().ref('Events').once('value').then(function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if (childSnapshot.key != "NumberOfEvents") {
              // this.setState({event:childSnapshot.val().eventName})
              var eventNameInclude = false;
              var descriptionInclude = false;
              var tagInclude = false;
    
              eventNameInclude = childSnapshot.val().eventName.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1 ? true : false;
              descriptionInclude = childSnapshot.val().description.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1 ? true : false;
              for(var i = 0; i < childSnapshot.val().category.length; i++){
                //alert(childSnapshot.val().category[i].label.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()));
                if((childSnapshot.val().category[i].label.toString().toLowerCase().indexOf(this.state.value.toString().toLowerCase()) !== -1)){
                  tagInclude = true;
                  break;
                }else{
                  tagInclude = false;
                }
              }
              if(tagInclude || eventNameInclude || descriptionInclude){
                        this.state.eventArray.push({
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
                        favoriteNum: childSnapshot.val().favoriteNum,
                        attending:childSnapshot.val().attending,
                      })
                      //alert(childSnapshot.val().category);
                }
          }
          }.bind(this))
        }.bind(this))
    //alert(this.state.eventArray)
    // this.state.eventArray.push({
    //                 // key: childSnapshot.val().key,
    //                 key: this.state.value,
    //                 date:'',
    //                 description:'',
    //                 eventName:this.state.value,
    //                 location:'',
    //                 time:'',
    //                 user:'',
    //                 category:'',
    //                 favoriteArray:'',
    //                 attending:'',
    //                 favoriteNum: -1,
    //               })
    //     this.state.Popbuffer.push({
    //                 // key: childSnapshot.val().key,
    //                 key: this.state.value,
    //                 date:'',
    //                 description:'',
    //                 eventName:this.state.value,
    //                 location:'',
    //                 time:'',
    //                 user:'',
    //                 category:'',
    //                 favoriteArray:'',
    //                 attending:'',
    //                 favoriteNum: 0,
    //               })
    //         this.state.Timebuffer.push({
    //                 // key: childSnapshot.val().key,
    //                 key: this.state.value,
    //                 date:'',
    //                 description:'',
    //                 eventName:this.state.value,
    //                 location:'',
    //                 time:'2020-12-31',
    //                 user:'',
    //                 category:'',
    //                 favoriteArray:'',
    //                 attending:'',
    //                 favoriteNum: -1,
    //               })
    //alert(this.state.eventArray.length)
    this.setState({value : this.state.value});

  }

  handleOnNavigateBack=() => {
    this.setup();
    
  }

  render() {
    const {navigation} = this.props
    // const data = this.state.data
    // alert(data)
    return (
      // <TouchableWithoutFeedback style={styles.container} behavior="padding" onPress={()=>{dismissKeyboard()}}>
      <View style={{flex: 1}}>
      <View style={{ flexDirection: "row",backgroundColor:"white",justifyContent:"center",alignItems:"center", marginBottom: 0}}>
        <SearchBar 
                lightTheme
                // showLoading
                placeholder="Search"
                // platform = "ios"
                platform="ios"
                //cancelButtonTitle="Cancel"
                containerStyle = {{height:screenHeight*0.06, width:screenWidth*0.9,borderWidth:0,backgroundColor:'white', borderTopColor:"transparent",borderBottomColor:"transparent"}}
                keyboardType = 'default'
                clearIcon={{color:'grey'}}
                //          value={this.state.value}
                onSubmit={value => console.log(value, 'onSubmit')} 
                onChangeText={(value) => this.setState({ value })}
                onSubmitEditing= {this.info.bind(this)}

                //          onClear={()=>{dismissKeyboard(); this.setState({value: ''})}}
                //          onChangeText={value => {this.setState({value})}}
        />
         <Menu
          style = {{justifyContent:"center",marginTop:screenHeight*0.06}}
          ref={this.setMenuRef} 
          button={<Icon 
            color = {this.state.color}
            onPress= {()=>{this.showMenu();
                           this.setState({color: "#E3170D"})}}
            name={'filter'} 

            size={22}/>}
          >
          <MenuItem onPress={()=> {this.hideMenu(); this.setState({color:"grey", eventArray: this.state.Timebuffer})}}>Sort by time</MenuItem>
          <MenuItem onPress={()=> {this.hideMenu(); this.setState({color:"grey", eventArray: this.state.Popbuffer.reverse()})}}>Sort by popularity</MenuItem>
        </Menu>
      </View>
      <CardList navigation={navigation} data={this.state.eventArray} handleOnNavigateBack={this.handleOnNavigateBack}/>
      </View>
      // </TouchableWithoutFeedback>
    );
  }

  // render() {
  //   return(
  //             <TouchableWithoutFeedback behavior="padding" onPress={()=>{dismissKeyboard()}}>
  //       <ScrollView>
  //       <View style={styles.container}>
  //       <FlatList
  //         directionalLockEnabled={true}
  //         ItemSeparatorComponent={ ()=> <View style={ { height:10,} } />}
  //         data={this.state.eventArray}
  //         renderItem={({item}) => <View>
  //           <TouchableOpacity style={styles.container}
  //                             onPress={() => {this.props.para.navigation.navigate('temp')}}>
  //            <View>
  //               <Text>{item.name}</Text>
  //               <Text>{item.user}</Text>
  //            </View>
  //           </TouchableOpacity>
  //           </View>
  //       }
  //       />
  //       </View>
  //       </ScrollView>
  //     </TouchableWithoutFeedback>
  //   )
  // }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 30, 
    marginRight:30
  }
})