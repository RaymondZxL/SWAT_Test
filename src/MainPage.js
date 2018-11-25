import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements'
import {Dimensions, PixelRatio} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Menu, {MenuItem,MenuDivider} from 'react-native-material-menu';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CardList from '../src/CardList';

const dismissKeyboard = require('dismissKeyboard')
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      color: 'grey'
    };
  }
  

 
    //   render() {
    //     var data = [["Sort by time: latest-","Sort by location: nearest-","Sort by popularity"]];
    //     return (
    //       <TouchableWithoutFeedback style={styles.container} behavior="padding" onPress ={()=>{dismissKeyboard()}}>
    //       <View style = {{flex: 1}}>
    //       <View style={styles.container,{marginBottom:-5,backgroundColor:"white"}}>
    //         <View style = {{flexDirection: "row", justifyContent: "space-around",alignItems:"center"}}>
    //           <SearchBar 
    //             lightTheme
    //             showLoading
    //             placeholder="Search"
    //             // platform = "ios"
    //             containerStyle = {{ flex: 8,borderWidth:0,backgroundColor:'white', borderTopColor:"transparent",borderBottomColor:"transparent"}}
    //             keyboardType = 'default'
    //             clearIcon={{color:'grey'}}
    //             //          value={this.state.value}
    //             onSubmit={value => console.log(value, 'onSubmit')} 
    //             //          onClear={()=>{dismissKeyboard(); this.setState({value: ''})}}
    //             //          onChangeText={value => {this.setState({value})}}
    //             />
    //            <Icon 
    //           name={'filter'} 
    //           style = {{flex:1,justifyContent:"space-around",color :'grey'}}
    //           size={24}/>
    //         </View>
    //       </View>

          
    //         <DropdownMenu
    //           style={{flex: 1}}
    //           bgColor={'white'}
    //           tintColor={'#666666'}
    //           activityTintColor={'green'}
    //           // arrowImg={}      
    //           // checkImage={}   
    //           // optionTextStyle={{color: '#333333'}}
    //           // titleStyle={{color: '#333333'}} 
    //           // maxHeight={300} 
    //           handler={(selection, row) => this.setState({text: data[selection][row]})}
    //           data={data}
    //         >
    //         </DropdownMenu>
    //       </View>
    //       </TouchableWithoutFeedback>
    //     )
    //   }
      
    // }

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
 
  render() {
    const {navigation} = this.props
    return (
      // <TouchableWithoutFeedback style={styles.container} behavior="padding" onPress={()=>{dismissKeyboard()}}>
      <View style={{flex: 1}}>
      <View style={{ flexDirection: "row",backgroundColor:"white",justifyContent:"center",alignItems:"center", marginBottom: 0}}>
        <SearchBar 
                lightTheme
                // showLoading
                placeholder="Search"
                // platform = "ios"
                containerStyle = {{height:screenHeight*0.06, width:screenWidth*0.9,borderWidth:0,backgroundColor:'white', borderTopColor:"transparent",borderBottomColor:"transparent"}}
                keyboardType = 'default'
                clearIcon={{color:'grey'}}
                //          value={this.state.value}
                onSubmit={value => console.log(value, 'onSubmit')} 
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
          <MenuItem onPress={()=>{this.hideMenu(); this.setState({color:"grey"})}}>Sort by distance</MenuItem>
          <MenuItem onPress={()=> {this.hideMenu(); this.setState({color:"grey"})}}>Sort by popularity</MenuItem>
        </Menu>

       
      </View>
      <CardList navigation={navigation}/>
      </View>
      // </TouchableWithoutFeedback>
    );
  }
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