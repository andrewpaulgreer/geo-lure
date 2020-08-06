import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";


const ListItem = ({item, children}) => {
return (
    <View style={{flex:1, height: 300, justifyContent: "center", flexDirection: "column", margin:5, backgroundColor:"white"}}>
    <View style={{ flex:1, justifyContent: "center", alignItems: "center", paddingLeft: 5 }}>
      <Text style={{fontWeight: "bold", fontSize: 25, marginTop: 5, marginBottom: 10}}>{item.name}</Text>
    <View style={{flex: 1, flexDirection: "row"}}>
    <View style={styles.imageContainer}>
    <Text style={styles.beforeAfterText}>Before</Text>
      <Image source={require('../assets/icon.png')} style={styles.image}></Image>
    </View>
    <View style={styles.imageContainer}>
    <Text style={styles.beforeAfterText}>After</Text>
      <Image source={require('../assets/icon.png')} style={styles.image}></Image>
    </View>
    </View>
    </View>
    <View style={{justifyContent:"center", alignItems: "center"}}>
    {children}
    </View>
  </View>
)


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
        flex:1,
        height: 150,
        width: 170,
        borderRadius: 35
    },
    imageContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
       paddingLeft: 5
    },
    beforeAfterText: {
        fontSize: 20
    }
})

export default ListItem