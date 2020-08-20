import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database'
import ListItem from '../../components/ListItem'
import {useSelector} from 'react-redux'


export default function JobsPosted () {

const {isLoadingJobs, jobsDone} = useSelector(state => state.jobs)

    return(
        <View style={{flex:1, backgroundColor: "#17252d"}} >
            {isLoadingJobs && (
          <View style={{...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', zIndex: 1000, elevation: 10000}}>
            <ActivityIndicator size="large" color="#00a7ff" />
          </View>
          )}
           <View style={styles.triangleTwo}></View>
          <View style={styles.TriangleShapeView}></View>
            <FlatList
            data={jobsDone}
            renderItem={({ item }, index) => <ListItem item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
                !isLoadingJobs && (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  No Jobs Have Been Posted
                </Text>
              </View>
                )
            }
          />
        </View>
    )

}

const styles = StyleSheet.create({
  TriangleShapeView: {
    //To make Triangle Shape
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 340,
    borderTopWidth: 290,
    borderRightColor: 'transparent',
    borderTopColor: "#17252D",
    transform: [
      {rotate: '180deg'}
    ],
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  triangleTwo: {
    //To make Triangle Shape
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 420,
    borderTopWidth: 300,
    borderRightColor: 'transparent',
    borderTopColor: 'red',
    transform: [
      {rotate: '180deg'}
    ],
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});