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
import SignUpScreen from './screens/SignupScreen'
import SettingsScreen from './screens/SettingsScreen'


import {createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'
import CustomDraw from "./screens/DrawNavigator/CustomDrawComponent";

/**
 * AppSwitchNav
 *  WelcomeScreen
 *   -signup
 *  HomeScreen
 */

const App = () =><AppContainer/>

const loginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUpScreen
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
  AppDrawnavigator
})

const AppContainer = createAppContainer(AppSwitchNavigator)

export default App;
