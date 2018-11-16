import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, StyleSheet, View} from 'react-native';

const dismissKeyboard = require('dismissKeyboard')
export default class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

  }
  
  render() {
    return (
      <TouchableWithoutFeedback behavior="padding" onPress={()=>{dismissKeyboard()}}>
        <View style={styles.container}>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white'
  }
})