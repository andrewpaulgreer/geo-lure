import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import History from "./components/History";
import { Ionicons } from "@expo/vector-icons";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jobsCount: 0,
      isAddJobVisible: false,
      textInputJobs: "",
      jobs:[]
    };
  }

  showAddJob = () => {
    this.setState({isAddJobVisible: true})
  }
  cancelAddJob = () => {
    this.setState({isAddJobVisible: false})
  }
  addJobText = job => {
   this.setState((state, props)=> ({
     jobs:[...state.jobs, job],
     jobCount: state.jobCount +1
   }), () => {
     console.log(this.state.jobs)
   })
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            borderBottomColor: "#7b48b4",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30 }}>Geo Lure</Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.isAddJobVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1, backgroundColor: "#d3d3d3", paddingLeft: 5 }}
                placeholder="Enter Job"
                onChangeText={(text)=> this.setState({textInputJobs: text})}
              />
              <TouchableOpacity onPress={()=> this.addJobText(this.state.textInputJobs)}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#19ffa8",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="ios-checkmark" color="white" size={40} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.cancelAddJob}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="ios-close" color="white" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20 }}
            onPress={this.showAddJob}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#19ffa8",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 70,
            borderTopWidth: 0.5,
            borderBottomColor: "#7b48b4",
          }}
        >
          <History title='total' count={this.state.jobsCount}/>
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
