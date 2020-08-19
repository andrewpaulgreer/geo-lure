import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import {connect, useDispatch} from 'react-redux'
import {signOut} from '../redux/actions'

export default function SettingsScreen (){
  const dispatch = useDispatch()

  const handleSignOut = async() => {
    try{
        await firebase.auth().signOut()
        dispatch(signOut());
        // this.props.signOut()
        // this.props.navigation.navigate('WelcomeScreen')
    }catch(error)
    {
        alert('Unable to sign out right now')
    }
}
return (
  <ImageBackground source={require('../assets/canva-real-house-blur.png')} style={styles.imageBackground}>
       <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
    <TouchableOpacity
      onPress={handleSignOut}
    >
      <View
        style={styles.settings}
      >
        <Text style={styles.text}>Sign Out</Text>
      </View>
    </TouchableOpacity>
    </View>
  </ImageBackground>
);

}



const styles = StyleSheet.create({

  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  settings: {
    width: 350,
    height: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderColor: "#00a7ff",
    borderWidth: 3,
    borderRadius: 180,
  },
  imageBackground: {
    flex: 1, 
    },
});


