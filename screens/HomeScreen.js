import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,

} from "react-native";
import History from "../components/History";
import ListItem from '../components/ListItem'
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import { snapshotToArray } from "../helpers/firebaseHelpers";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      jobsCount: 0,
      jobsDoneCount: 0,
      isAddJobVisible: false,
      textInputJobs: "",
      jobs: [],
      jobsDone: [],
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    const jobs = await firebase
      .database()
      .ref("jobs")
      .child(user.uid)
      .once("value");
    const jobsArray = snapshotToArray(jobs);

    this.setState({
      currentUser: currentUserData.val(),
      jobs: jobsArray.filter((job) => !job.completed),
      jobsDone: jobsArray.filter((job) => job.completed),
    });
  };

  showAddJob = () => {
    this.setState({ isAddJobVisible: true });
  };
  cancelAddJob = () => {
    this.setState({ isAddJobVisible: false });
  };
  addJobText = async (job) => {
    try {
      const snapshot = await firebase
        .database()
        .ref("jobs")
        .child(this.state.currentUser.uid)
        .orderByChild("name")
        .equalTo(job)
        .once("value");

      const key = await firebase
        .database()
        .ref("jobs")
        .child(this.state.currentUser.uid)
        .push().key;

      const response = await firebase
        .database()
        .ref("jobs")
        .child(this.state.currentUser.uid)
        .child(key)
        .set({ name: job, completed: false });

      this.setState(
        (state, props) => ({
          jobs: [...state.jobs, { name: job, completed: false }],
          // jobsCount: state.jobsCount + 1,
        }),
        () => {
          console.log(this.state.jobs);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  markAsDone = async (selectedJob, index) => {
    try {
      await firebase
        .database()
        .ref("jobs")
        .child(this.state.currentUser.uid)
        .child(selectedJob.key)
        .update({ completed: true });
      let newJob = this.state.jobs.filter(
        (job) => job.name !== selectedJob.name
      );

      this.setState((prevState) => ({
        jobs: newJob,
        jobsDone: [
          ...prevState.jobsDone,
          { name: selectedJob.name, completed: true },
        ],
        // jobsCount: prevState.jobsCount - 1,
        // jobsDoneCount: prevState.jobsDoneCount + 1
      }));
    } catch (errors) {
      console.log(error);
    }
  };

  renderItem = (item, index) => (
   <ListItem item={item}>
     {item.completed ? (
      <Ionicons name="ios-checkmark" color="green" size={50} />
    ) : (
      <TouchableOpacity onPress={() => this.markAsDone(item, index)}>
        <View
          style={styles.completedBtn}
        >
          <Text style={{ color: "#00a7ff", fontSize:20 }}>Complete</Text>
        </View>
      </TouchableOpacity>
    )}
   </ListItem>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#3e4544" }}>
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
          <Text style={{ fontSize: 30, color: "#00a7ff" }}>Geo Lure</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50, flexDirection: "row", margin: 5 }}>
          <TextInput
                style={{ flex: 1, backgroundColor: "transparent", paddingLeft: 5, borderColor:"#d3d3d3", borderBottomWidth: 2, fontSize: 20}}
                placeholder="Enter Job"
                placeholderTextColor="#d3d3d3"
                onChangeText={(text) => this.setState({ textInputJobs: text })}
              />
          </View>
          {/* {this.state.isAddJobVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                style={{ flex: 1, backgroundColor: "#d3d3d3", paddingLeft: 5 }}
                placeholder="Enter Job"
                onChangeText={(text) => this.setState({ textInputJobs: text })}
              />
              <TouchableOpacity
                onPress={() => this.addJobText(this.state.textInputJobs)}
              >
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
          )} */}

          <FlatList
            data={this.state.jobs}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>No Jobs Added</Text>
              </View>
            }
          />
          {this.state.textInputJobs.length > 0?(

          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20 }}
            onPress={this.showAddJob}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "#19ffa8",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>+</Text>
            </View>
          </TouchableOpacity>
          ):null}
        </View>
        <View
          style={{
            height: 70,
            borderTopWidth: 0.5,
            borderBottomColor: "#7b48b4",
          }}
        >
          <History
            count={this.state.jobs.length}
            posted={this.state.jobsDone.length}
          />
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
  completedBtn: {
    width: 400,
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom:10,
    borderRadius: 20,
    borderColor: "#00a7ff",
    borderWidth: 3
  }
  
});

export default HomeScreen;
