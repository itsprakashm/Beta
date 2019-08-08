import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import Login from './Login';
import Getcontacts from './Getcontacts';
const AppNavigator = createStackNavigator(  
    {  
        Login: Login,  
        Contacts: Getcontacts  
    },  
    {  
        initialRouteName: "Login"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator); 
export default class App extends Component {
  render() {  
        return <AppContainer />;  
    } 
}