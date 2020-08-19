import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ScrollView} from "react-native-gesture-handler";
import { DrawerItemList } from "@react-navigation/drawer";
// import {DrawerItemList} from 'react-navigation/drawer'

export default function CustomDrawNavigator(props) {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: "#3e4544" }} />
        <View
          style={{
            height: 150,
            backgroundColor: "#3e4544",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Platform.OS == 'android'? 20:0
          }}
        >
          <Text style={styles.logo}>GeoLure</Text>
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
});


