import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ScrollView} from "react-native-gesture-handler";
import { DrawerItemList } from "@react-navigation/drawer";
// import {DrawerItemList} from 'react-navigation/drawer'

export default function CustomDrawNavigator(props) {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: "#17252D" }} />
        <View
          style={{
            height: 150,
            backgroundColor: "#17252D",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Platform.OS == 'android'? 20:0
          }}
        >
           <Image
                source={require("../../assets/Draw.jpg")}
                style={styles.placeholder}
              ></Image>
        </View>
        <DrawerItemList {...props} />
      </ScrollView>
    );
  
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    justifyContent: "center",
    fontSize: 40,
    color: "#00a7ff",
  },
  login: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#19ffa8",
  },
  signup: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00a7ff",
  },
  placeholder: {
    flex: 1,
    width: 300,
    height: 500,
    
  },
});


