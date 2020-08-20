
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  requireNativeComponent
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native'

export default function WelcomeScreen(){

  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/EF-Local-Home.png')} style={styles.imageBackground}>
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
           
        </View>
        <View style={{flex: 1}}>
        <View style={{flex: 1, alignItems:"center"}}>
        <TouchableOpacity
           onPress={() => navigation.navigate('LoginScreen')}
         >
           <View
             style={{
               width: 300,
               height: 100,
               backgroundColor: "transparent",
               alignItems: "center",
               justifyContent: "center",
               borderColor: "white",
               borderWidth: 3,
               borderRadius: 10,
               position: "center",
               bottom: 100
             }}
           >
             <Text style={styles.login}>Login</Text>
           </View>
         </TouchableOpacity>
         </View>
        </View>
    </ImageBackground>
)
}


const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center', 
    fontSize: 40,
    color: '#00a7ff',
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },

  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


