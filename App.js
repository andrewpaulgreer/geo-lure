import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDraw from "./screens/DrawNavigator/CustomDrawComponent";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import CountContainer from "./redux/containers/CountContianer";
import JobsPosted from "./screens/HomeTabNavigator/JobsPosted";
import { Provider } from "react-redux";
import store from "./redux/store";
import GeoLure from './GeoLure'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";


import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";
import { Colors } from "react-native/Libraries/NewAppScreen";


/**
 * AppSwitchNav
 *  WelcomeScreen
 *   -signup
 *  HomeScreen
 */
class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }



  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return (
      <Provider store={store}>
          <GeoLure />
      </Provider>
    );
  }
}



export default App;
