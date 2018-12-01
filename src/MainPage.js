import React, {Component} from 'react';
import {ScrollView, FlatList,Text, TouchableWithoutFeedback, StyleSheet, View,TouchableOpacity } from 'react-native';
import {SearchBar} from 'react-native-elements'
import {Dimensions, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Menu, {MenuItem,MenuDivider} from 'react-native-material-menu';
import CardList from '../src/CardList';
import firebase from 'react-native-firebase';

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
    };
    // setup = this.setup.bind(this)
    // this.setup()
  }
 componentDidMount(){ 
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
    await firebase.database().ref('Events').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {
          // this.setState({event:childSnapshot.val().eventName})
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
            attending:childSnapshot.val().attending,
          })
        }
      }.bind(this))
    }.bind(this))
    // alert(this.state.eventArray)
    console.log(this.state.eventArray)

    var user = firebase.auth().currentUser;
    if (user != null) {
      interest = null
      // alert(user.email)
      // alert(user.uid)
      await firebase.database().ref('Users/').child(user.uid).once('value').then(function(snapshot){
        interest = snapshot.val().interest;
        for (var i = 0; i < interest.length; i++) {
          var cat = interest[i]
          // console.log(cat)
          eventArray = this.state.eventArray
        
          for(var j = 0; j < eventArray.length; j++) {
            var event = eventArray[j]
            // console.log(event)
            // data = this.state.data
            var eventCat = event.category
            // console.log(eventCat)
            if (eventCat && !this.state.data.includes(event)){
              for (var p = 0; p < eventCat.length; p++) {
                if (eventCat[p].id == cat.id)
                  this.state.data.push(event)
              }  
            }
            // if (!this.state.data.includes(event)) {
            //   eventCat = event.category
            //   console.log(eventCat)
            //   if (eventCat && eventCat.includes(cat))
            //     this.state.data.push(event)
            // }
          }

        }
        // alert(this.state.data)
        // console.log(this.state.data)

      }.bind(this))
      // .catch((error)=> {
      //   alert(error.errorMessage)
      // })
     
    }
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
    await firebase.database().ref('Events').once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if (childSnapshot.key != "NumberOfEvents") {
          // this.setState({event:childSnapshot.val().eventName})
          if( childSnapshot.val().eventName.indexOf(this.state.value) !== -1 ){
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
                    attending:childSnapshot.val().attending,
                  })
        }
      }
      }.bind(this))
    }.bind(this))
    //alert(this.state.eventArray)
    this.state.eventArray.push({
                    // key: childSnapshot.val().key,
                    key: this.state.value,
                    date:'',
                    description:'',
                    eventName:this.state.value,
                    location:'',
                    time:'',
                    user:'',
                    category:'',
                    favoriteArray:'',
                    attending:'',
                  })
    //alert(this.state.eventArray.length)
    this.setState({value : ''})

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
          <MenuItem onPress={()=>{this.hideMenu(); this.setState({color:"grey"})}}>Sort by time</MenuItem>
          <MenuItem onPress={()=> {this.hideMenu(); this.setState({color:"grey"})}}>Sort by popularity</MenuItem>
        </Menu>
      </View>
      <CardList navigation={navigation} data={this.state.eventArray}/>
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