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
        <View style={{flex:1, backgroundColor: "#3e4544"}} >
            {isLoadingJobs && (
          <View style={{...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', zIndex: 1000, elevation: 10000}}>
            <ActivityIndicator size="large" color="#00a7ff" />
          </View>
          )}
            <FlatList
            data={jobsDone}
            renderItem={({ item }, index) => <ListItem item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
                !isLoadingJobs && (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  No Jobs Have Been Posted
                </Text>
              </View>
                )
            }
          />
        </View>
    )

}

