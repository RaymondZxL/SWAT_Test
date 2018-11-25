// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flexDirection: 'column'
// 	},

// 	containerRow: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flexDirection: 'row'
// 	},

// 	spacing: {
// 		flex: 0.1,
// 	},

// 	title: {
// 		fontWeight: 'bold',
// 		fontSize: 30,
// 	},

// 	titlePnl: {
// 		alignItems: 'center'
// 	},

// 	logo: {
// 		height: 280
// 	},

// 	avatar: {
// 		height: 110,
// 		width: 110,
// 		alignItems: 'center'
// 	},

// 	textBox: {
// 		fontFamily: 'Avenir',
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},

// 	contents: {
// 		fontFamily: 'Avenir',
// 		fontSize:18,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		marginBottom: 30
// 	},

// 	titleText:{
// 		fontFamily: 'Avenir',
// 		fontSize: 20,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},

// 	button1: {
// 		alignItems: 'center',
// 		// backgroundColor: '#1aa3ff',
// 		backgroundColor: '#CC0F0F',
// 		width: 300,
// 		height: 44,
// 		padding: 10,
// 		borderWidth: 0,
// 		borderColor: 'transparent',
// 		opacity: 0.7,
// 		borderRadius: 5,
// 		// borderRadius: 25,
// 		marginBottom: 10,
// 		// shadowOffset:{  width: 5,  height: 5,  },
// 		// shadowColor: 'black',
// 		// shadowOpacity: 1.0,
// 	},

// 	button2: {
// 		alignItems: 'center',
// 		backgroundColor: 'white',
// 		width: 150,
// 		height: 44,
// 		padding: 10,
// 		borderWidth: 1,
// 		borderColor: 'white',
// 		borderRadius: 25,
// 		marginBottom: 10,
// 	},

// 	buttonText:{
// 		fontFamily: 'Avenir',
// 		fontSize: 15,
// 		// fontWeight: 'bold',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		color: 'white',
// 		// textShadowColor: 'rgba(0, 0, 0, 0.75)',
// 		// textShadowOffset: {width: 1, height: 1},
// 		// textShadowRadius: 5,
// 	},

// 	submitText:{
// 		fontFamily: 'Avenir',
// 		fontSize: 20,
// 		// fontWeight: 'bold',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		// color: 'white',
// 		textShadowColor: 'rgba(0, 0, 0, 0.75)',
// 		textShadowOffset: {width: 1, height: 1},
// 		textShadowRadius: 5,
// 	},

// 	input: {
// 		width: 300,
// 		fontFamily: 'Avenir',
// 		fontSize: 20,
// 		height: 44,
// 		padding: 10,
// 		borderWidth: 1,
// 		borderColor: 'grey',
// 		borderRadius: 5,
// 		marginVertical: 10,
// 	},

// 	form: {
// 		flex: 1,
// 		justifyContent: 'space-between',
// 	},

// 	spacer: {
// 		padding: 20,
// 	},

// 	inputMain: {
// 		width: 300,
// 		fontFamily: 'Baskerville',
// 		fontSize: 20,
// 		height:44
// 	}
// });

import { StyleSheet, Dimensions } from 'react-native';
const {width: WIDTH} = Dimensions.get('window')
export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
 },

 container1: {
     flex:1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'space-evenly',
     flexDirection: 'column',
 },

 containerRow: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row'
 },

 spacing: {
  flex: 0.1,
 },

 title: {
  fontWeight: 'bold',
  fontSize: 30,
 },

 titlePnl: {
  alignItems: 'center'
 },

 logo: {
  height: 280
 },

 avatar: {
  height: 110,
  width: 110,
  alignItems:"center",
 },

 textBox: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
},

 contents: {
  fontFamily: 'Avenir',
  fontSize: 18,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom:30,
 },

 titleText:{
  fontFamily: 'Avenir',
  fontSize: 20,
  alignItems: 'center',
  justifyContent: 'center',
 },

 button1: {
  alignItems: 'center',
  // backgroundColor: '#1aa3ff',
  // backgroundColor: 'powderblue',
  backgroundColor: '#cc0f0f',
  opacity: 0.7,
  width: 300,
  height: 44,
  padding: 10,
  borderWidth: 0,
  borderColor: 'transparent',
  borderRadius: 5,
  marginBottom: 10,
  // shadowOffset:{  width: 5,  height: 5,  },
  // shadowColor: 'black',
  // shadowOpacity: 1.0,
 },

 button2: {
  alignItems: 'center',
  backgroundColor: 'white',
  width: 150,
  height: 44,
  padding: 10,
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 25,
  marginBottom: 10,
 },

 buttonText:{
  fontFamily: 'Avenir',
  fontSize: 15,
  // fontWeight: 'bold',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  // textShadowColor: 'rgba(0, 0, 0, 0.75)',
  // textShadowOffset: {width: 1, height: 1},
  // textShadowRadius: 5,
 },
 
 buttonText1: {
     fontFamily: 'Avenir',
     fontSize:15,
     flexDirection: 'row',
     fontWeight: 'bold',
     left: 5,
 },

 submitText:{
  fontFamily: 'Avenir',
  fontSize: 20,
//   fontWeight: 'bold',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
//   textShadowColor: 'rgba(0, 0, 0, 0.75)',
//   textShadowOffset: {width: 1, height: 1},
//   textShadowRadius: 5,
 },

 input: {
  width: 300,
  fontFamily: 'Avenir',
  fontSize: 20,
  height: 44,
  padding: 10,
  borderWidth: 1,
  borderColor: 'grey',
  borderRadius: 5,
  marginVertical: 10,
 },

 loginInput: {
    width: WIDTH - 150,
    height: 45,
    fontSize: 16,
    paddingLeft: 10,
    marginHorizontal: 25,
},

btnEye: {
    opacity:0.5,
    position: 'absolute',
    flexDirection: 'row',
    right: WIDTH*0.05,
},

btnEyeReg: {
    opacity:0.5,
    position: 'absolute',
    flexDirection: 'row',
    right: WIDTH*0.04,
    top: 20,
},

 form: {
  flex: 1,
  justifyContent: 'space-between',
 },

 spacer: {
  padding: 20,
 },

 inputMain: {
     width: 300,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
 },

 forgotPass: {
     position: 'absolute',
     fontFamily: 'Avenir',
     fontSize: 15,
     top: 5,
     right: WIDTH*0.05,
 }
});