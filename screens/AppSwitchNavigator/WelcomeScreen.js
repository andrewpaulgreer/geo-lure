
import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  requireNativeComponent,
  Modal,
  Button
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native'

export default function WelcomeScreen(){

  const [modalIsOpen, setModalIsOpen] = useState(true)

 
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/Welcome.jpg')} style={styles.imageBackground}>
      
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
        <Modal transparent={true}
        visible={modalIsOpen}
        
        >
          <View style={{backgroundColor:"#000000aa", flex: 1}}>
            <View style={styles.modal}>
              
        <Text style={styles.disclaimer}>Easyfish Local collects location data in order to pinpont job sites where users create posts to help their company get found online. We only document your current location when the white "+" button is tapped to add a new job.</Text>
        {/* <View style={{width: "100%", flexDirection: "column", height: 100, backgroundColor:"blue"}}>
                 <Button title="I Understand" onPress={()=>setModalIsOpen(false)} color="blue"  />
                 </View> */}
       <TouchableOpacity
        onPress={()=>setModalIsOpen(false)}
         >
           <View
             style={styles.understandContainer}
           >
             <Text style={styles.understand}>I Understand</Text>
           </View>
         </TouchableOpacity>        
         </View>
        </View>
        </Modal>
        </View>
        <View style={{flex: 1}}>
        
        <View style={{flex: 1}}>
        <TouchableOpacity
        style={{bottom: 100}}
           onPress={() => navigation.navigate('LoginScreen')}
         >
           <View
             style={styles.loginContainer}
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
  loginContainer: {
    width: 300,
    height: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EE1B24",
    borderWidth: 3,
    borderRadius: 10,
    
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  understandContainer: {
    width: 300,
    height: 100,
    backgroundColor: "#17252D",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EE1B24",
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: "10%"
  },
  understand: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EE1B24'
  },
  disclaimer: {
    fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    color: '#17252D',
    width: '80%',
    
    marginTop:'10%',
   marginBottom:'0%',
   marginLeft: '0%'
  
 },
 modal: {
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundColor: "#E4F5FF", 
  marginTop: "25%", 
  margin: "5%",
   borderWidth: 3,
   borderRadius: 20,
  },

  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


