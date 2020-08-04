import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#bababa" }}>
           <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("WelcomeScreen")}
        >
          <View
            style={{
              width: 350,
              height: 100,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              borderColor: "#00a7ff",
              borderWidth: 3,
              borderRadius: 180,
            }}
          >
            <Text style={styles.signup}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
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

export default SettingsScreen;
