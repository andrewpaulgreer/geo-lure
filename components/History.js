import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from "react-native";


const History = ({count, posted}) => {
return (
  <>
  <View style={{flexDirection: "row"}}>
    <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}>
        <Text style={{fontSize: 20, color:"white"}}>Jobs To Post:</Text>
    <Text style={{color:"white", fontSize: 20}}>{count}</Text>
      </View>
        <View style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10
        }}>
          <Text style={{fontSize: 20, color:"white"}}>Jobs Posted</Text>
      <Text style={{color:"white", fontSize: 20}}>{posted}</Text>
        </View>
        </View>
      </>
)


}

export default History