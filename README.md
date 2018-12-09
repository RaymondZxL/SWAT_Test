# SWAT_Test
Introduction
College is the time for new experiences. Experiences develop perspective, resulting in personal growth and a better understanding of others; attributes vital to success in the real world. Stay Woke At Trending is an IOS based app that provides a way for college students attending University of California San Diego to expand and develop their network by hosting and attending a variety of events, archiving favorite events, as well as personalize their discovery feed through a filtering system based on popularity, time and category, overall providing a better user experience. 

Login Credentials
For testing purposes, we have created an account and provided the credentials below.
Username: test222@ucsd.edu
Password: test222

Requirements
This application must be run on an iOS platform.
The user must have an Internet connection while using the application.
XCode installed.

Installation Instruction:
Run following command to download node modules
npm install
npm install --save react-native-material-menu
npm install --save react-native-elements
npm install --save react-native-responsive-image
npm install --save react-native-tag-select
npm install --save react-native-scrollable-tab-view
npm install --save react-native-datepicker
react-native link

How to Run
npm start
react-native run-ios

Known Bugs

For reset password, it must be a valid UCSD email so that the backend can send an email containing the instruction to reset password.

When searching a keyword using search bar on the home page, if the user click on event card and use the return button to back to the home page, all events will be shown instead of the previous search result. 

The MyEvent page might be blank and the user should click on one of the three tabs (recommend, favorite and attending) to show event list.

The user might have to give a second before tapping again the button so that the backend can correctly store the information to the firebase.

If there is any warning pops up, click on “dismiss all”, the app should still work as expected.

Troubleshooting
If any unexpected behavior occurs, try refreshing the app by shaking the phone and pressing the refresh button.

Contacts for Technical Support
Zhixian Chen 8584053676 Algorithm Specialist
Shirley Zhang 6263752288 Quality Assurance Lead
