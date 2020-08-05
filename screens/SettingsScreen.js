import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";

class SettingsScreen extends React.Component {
    signOut = async() => {
        try{
            await firebase.auth().signOut()
            this.props.navigation.navigate('WelcomeScreen')
        }catch(error)
        {
            alert('Unable to sign out right now')
        }
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#3e4544" }}>
           <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
        <TouchableOpacity
          onPress={this.signOut}
        >
          <View
            style={styles.settings}
          >
            <Text style={styles.text}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
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
  }
});

export default SettingsScreen;
