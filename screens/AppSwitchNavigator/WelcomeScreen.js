
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native'

export default function WelcomeScreen(){

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor:"#3e4544"}}>
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
           <Text style={styles.logo}>GeoLure</Text>
        </View>
        <View style={{flex: 1}}>
        <View style={{flex: 1, alignItems:"center"}}>
        <TouchableOpacity
           onPress={() => navigation.navigate('LoginScreen')}
         >
           <View
             style={{
               width: 350,
               height: 100,
               backgroundColor: "transparent",
               alignItems: "center",
               justifyContent: "center",
               borderColor: "#19ffa8",
               borderWidth: 3,
               borderRadius: 180,
             }}
           >
             <Text style={styles.login}>Login</Text>
           </View>
         </TouchableOpacity>
         </View>
        </View>
    </View>
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
    color: '#19ffa8'
  },
  signup: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00a7ff'
  }
});


