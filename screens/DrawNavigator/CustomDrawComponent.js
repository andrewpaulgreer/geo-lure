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
import { ScrollView } from "react-native-gesture-handler";
import {DrawerItems} from 'react-navigation'


class CustomDraw extends React.Component {
 render(){
     return (
      <ScrollView>
          <SafeAreaView style={{backgroundColor: "White"}} />
          <View style={{height: 150, backgroundColor: "white", alignItems:"center", justifyContent: "center"}}>
              <Ionicons name="ios-bookmakrs" size={100} color="#00a7ff" />
          </View>
          <DrawerItems {...this.props} />
      </ScrollView>
     )
 }
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

export default CustomDraw;
