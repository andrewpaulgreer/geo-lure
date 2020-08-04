
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";


class SignUpScreen extends React.Component {
 render(){
     return (
         <View style={{flex: 1, backgroundColor:"#bababa"}}>
           <Text>Signup</Text>
         </View>
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

export default SignUpScreen;
