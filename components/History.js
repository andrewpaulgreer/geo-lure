import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from "react-native";


const History = ({count}) => {
return (
    <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text style={{fontSize: 20}}>Jobs To Post:</Text>
    <Text>{count}</Text>
      </View>
)


}

export default History