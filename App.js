import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SettingsScreen from './screens/SettingsScreen'
import CustomDraw from "./screens/DrawNavigator/CustomDrawComponent";
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';


import {createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'

import * as firebase from 'firebase/app'
import {firebaseConfig} from './config/config'


/**
 * AppSwitchNav
 *  WelcomeScreen
 *   -signup
 *  HomeScreen
 */
class App extends React.Component{
  constructor(){
    super()
    this.initializeFirebase()
  }

  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig)
  }
  render(){
    return <AppContainer/>;
  }
}

const loginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {

    }
  }
}, {
  mode: 'modal',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#3e4544'
    }
  }
})

const AppDrawnavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
    title: "Home",
    drawerIcon: ()=> <Ionicons name="ios-home" size={24}/>
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: "Settings",
      drawerIcon: () => <Ionicons name="ios-settings" size={24}/>
    } 
  }
}, {
  contentComponent: CustomDraw
})

const AppSwitchNavigator = createSwitchNavigator({
  loginStackNavigator,
  AppDrawnavigator,
  LoadingScreen,
})

const AppContainer = createAppContainer(AppSwitchNavigator)

export default App;
