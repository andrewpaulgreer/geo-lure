import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

class LoadingScreen extends React.Component {
    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
      this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('HomeScreen', {user});
            } else {
                this.props.navigation.navigate('LoginStackNavigator');
            }
        })
    }

    componentWillUnmount = () => {
        this.unsubscribe()
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#3e4544" }}>
           <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
           <ActivityIndicator size="large" color="#19ffa8"/>
        </View>
      </View>
    );
  }
}


export default LoadingScreen;
