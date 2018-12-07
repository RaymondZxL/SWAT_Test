import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, ScrollView, StyleSheet, Image, Animated, TouchableWithoutFeedback, Keyboard, Dimensions, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import styles from '../src/Styles'
import Icon from 'react-native-vector-icons/Ionicons'
import resolveAssetSource from 'resolveAssetSource';

const {width: WIDTH} = Dimensions.get('window');

export default class App extends Component {
  constructor(props){
    super(props);
    this.imageHeight = new Animated.Value(280);
    this.pic = require("../assets/IMG_2197.jpg");
    this.s = resolveAssetSource(this.pic);
    this.imageWidth = new Animated.Value(this.s.width);
    this.state = {
      user:{
        email: '',
        password: '',
        name: '',
        interests: [],
        birthday: '',
        re_password: '',
        accountCreationDate: 0
      },
      email: '',
      password: '',
      login: false,
      onOffPassword: true,
      clicked: false

    }
  }

  static navigationOptions = {
    headerLeft: null,
    title: 'SWAT',
  };

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

    keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 110,
            }),
            Animated.timing(this.imageWidth, {
                duration: event.duration,
                toValue: 110/280*this.s.width,
            }),
        ]).start();
    };

    keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 280,
            }),
            Animated.timing(this.imageWidth, {
                duration: event.duration,
                toValue: this.s.width,
            }),
        ]).start();
    };


  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.props.navigation.navigate('Home');
      }else{
        this.props.navigation.navigate('Main');
      }
    });
  }

  async onLogin() {
    if (this.state.email === '' || this.state.password === '') {
      alert('Empty!');
    }
    else {
      const reg = /^\w+([\.-]?\w+)*@ucsd.edu$/;
      if (reg.test(this.state.email) === false){
        alert('UCSD email !!!');
      }else{
        this.state.user.email = this.state.email;
        this.state.user.password = this.state.password;
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
          var errorMeg = error.message;
          alert(errorMeg);
          return;
        });

        firebase.auth().onAuthStateChanged(user =>{
          if(user){
            this.props.navigation.reset([NavigationActions.navigate({routeName: 'Home'})], 0)
          }else{
            this.props.navigation.navigate('Main');
            // this.props.navigation.reset([NavigationActions.navigate({routeName: 'Main'})], 0)
          }
        });
      }
    }
  }

  onOffPassword = () => {
    if (this.state.clicked == false) {
      this.setState({onOffPassword: false, clicked: true})
    }
    else {
      this.setState({onOffPassword: true, clicked: false})
    }
  };


  render() {
    return (
        <KeyboardAvoidingView style={styles.container1} behavior='padding'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container1}>
          <Animated.Image source={require("../assets/IMG_2197.jpg")} style = {{height: this.imageHeight, width: this.imageWidth}}/>

          <View>
            <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
              <Icon name={'ios-mail'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
              <TextInput
                style={styles.loginInput}
                maxLength={35}
                value={this.state.email}
                keyboardType = 'email-address'
                onChangeText={(email) => this.setState({ email })}
                placeholder='Email'
                placeholderTextColor = 'gray'
                borderBottomColor = 'gray'
                borderBottomWidth = {1}
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <Icon name={'ios-lock'} size={20} style={{opacity:0.5, left: WIDTH*0.05}}/>
              <TextInput
                style={styles.loginInput}
                maxLength={35}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={this.state.onOffPassword}
                placeholderTextColor = 'gray'
                borderBottomColor = 'gray'
                borderBottomWidth = {1}
              />

              <TouchableOpacity style={styles.btnEye} onPress={this.onOffPassword.bind(this)}>
                <Icon name={this.state.clicked == false ? 'ios-eye' : 'ios-eye-off'} size={20} style={{opacity: 0.7}}/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => {this.props.navigation.reset([NavigationActions.navigate({routeName:'Password'})], 0)}}>
              <Text style={styles.forgotPass}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button1} onPress={this.onLogin.bind(this) }>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>New user?</Text>
              <TouchableOpacity onPress={() => {this.props.navigation.reset([NavigationActions.navigate({routeName:'NewUser'})], 0)}}>
              <Text style={styles.buttonText1}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
  }
}
