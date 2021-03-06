import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Swipeout from "react-native-swipeout";
import { Ionicons } from "@expo/vector-icons";
import * as ImageHelpers from "../helpers/ImageHelpers";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";

import {
  toggleIsLoading,
  updateJobImage,
  markJobAsDone,
  deleteJob,
  chosenType,
} from "../redux/actions";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

var radio_props = [
  { label: "Repair", value: "Repair" },
  { label: "Estimate", value: "Estimate" },
  { label: "Install", value: "Installation" },
];

const JobRow = ({ item, index }) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const { showActionSheetWithOptions } = useActionSheet();

  const markAsDone = async (selectedJob, index) => {
    try {
      dispatch(toggleIsLoading(true));
      await firebase
        .database()
        .ref("jobs")
        .child(currentUser.uid)
        .child(selectedJob.key)
        .update({ completed: true, value });

      dispatch(markJobAsDone(selectedJob));

      //   this.props.toggleIsLoading(false);
      dispatch(toggleIsLoading(false));
    } catch (error) {
      console.log(error);
      //   this.props.toggleIsLoading(false);
      dispatch(toggleIsLoading(false));
    }
    chooseType();
  };

  const chooseType = async (selectedJob, index) => {
    setValue(value);
    try {
      dispatch(chosenType({ value: value }));
      console.log(value);

      //   this.props.toggleIsLoading(false);
      dispatch(toggleIsLoading(false));
    } catch (error) {
      console.log(error);
      //   this.props.toggleIsLoading(false);
      dispatch(toggleIsLoading(false));
    }
  };

  const handleDeleteJob = async (selectedJob, index) => {
    try {
      dispatch(toggleIsLoading(true));
      await firebase
        .database()
        .ref("jobs")
        .child(currentUser.uid)
        .child(selectedJob.key)
        .remove();

      dispatch(deleteJob(selectedJob));
      dispatch(toggleIsLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(toggleIsLoading(false));
    }
  };

  const uploadImage = async (image, selectedJob) => {
    const ref = firebase
      .storage()
      .ref()
      .child(currentUser.uid)
      .child(selectedJob.key);
    try {
      const blob = await ImageHelpers.prepareBlob(image.uri);
      const snapshot = await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();

      await firebase
        .database()
        .ref("jobs")
        .child(currentUser.uid)
        .child(selectedJob.key)
        .update({ image: downloadUrl });

      blob.close();

      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const openImageLibrary = async (selectedJob) => {
    const result = await ImageHelpers.openImageLibrary();
    if (result) {
      console.log("response: ", result);
      // console.log('response latitude: ', result.latitude);
      // console.log('response longitude: ', result.longitude);
      dispatch(toggleIsLoading(true));
      const downloadUrl = await uploadImage(result, selectedJob);
      dispatch(updateJobImage({ ...selectedJob, uri: downloadUrl }));
      //   this.props.updateJobImage({...selectedJob, uri: downloadUrl})
      dispatch(toggleIsLoading(false));
    }
  };

  const openCamera = async (selectedJob) => {
    const result = await ImageHelpers.openCamera();
    if (result) {
      console.log("response: ", result);
      dispatch(toggleIsLoading(true));
      const downloadUrl = await uploadImage(result, selectedJob);
      dispatch(updateJobImage({ ...selectedJob, uri: downloadUrl }));
      //   this.props.updateJobImage({...selectedJob, uri: downloadUrl})
      dispatch(toggleIsLoading(false));
    }
  };

  const addImage = (selectedJob) => {
    const options = ["select from photos", "open camera", "cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          openImageLibrary(selectedJob);
        } else if (buttonIndex == 1) {
          openCamera(selectedJob);
        }
      }
    );
  };

  let swipeoutButtons = [
    {
      text: "delete",
      component: (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="ios-trash" size={40} color="white" />
        </View>
      ),
      backgroundColor: "red",
      onPress: () => handleDeleteJob(item, index),
    },
  ];

  return (
    // <Swipeout
    //   autoClose={true}
    //   style={{ marginHorizontal: 0, marginVertical: 5 }}
    //   backgroundColor="#3e4544"
    //   right={swipeoutButtons}
    // >
    <View style={{ marginHorizontal: 0, marginVertical: 5 }}>
      <ListItem
        editable={true}
        marginVertical={0}
        item={item}
        onPress={() => addImage(item)}
      >
        <TouchableOpacity
          onPress={() => handleDeleteJob(item, index)}
          style={{ paddingRight: 20, right: "35%", bottom: 90 }}
        >
          <View style={styles.delButton}>
            <Ionicons name="ios-trash" size={30} color="#EE1B24" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <RadioForm
            formHorizontal={true}
            labelHorizontal={false}
            radio_props={radio_props}
            initial={-1}
            outerColor={"#00a7ff"}
            selectedButtonColor={"#EE1B24"}
            buttonSize={30}
            buttonOuterSize={40}
            onPress={(value) => setValue(value)}
            labelColor={"white"}
            selectedLabelColor={"#00a7ff"}
            labelStyle={{
              fontSize: 22,
              marginRight: 15,
              marginLeft: 15,
              paddingTop: 10,
              marginTop: 5,
            }}
          />
        </View>
        {item.completed ? (
          <Ionicons name="ios-checkmark" color="green" size={50} />
        ) : (
          <TouchableOpacity
            onPress={() => markAsDone(item, index)}
            style={{
              width: 350,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.postBtn}>
              <View style={styles.postTxtContainer}>
                <Text style={styles.postText}>Post Job</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ListItem>
    </View>
    // </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  postBtn: {
    width: "90%",
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#17252D",
    borderColor: "#00a7ff",
    borderWidth: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 90,
  },
  jobInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 20,
    borderColor: "#d3d3d3",
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 20,
    color: "#d3d3d3",
    margin: 3,
    height: 50,
  },
  animatedText: {
    fontSize: 20,
    color: "white",
  },
  delButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#17252D",
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 40,

    borderColor: "#EE1B24",
  },
  postText: {
    fontSize: 30,
    color: "#00a7ff",
  },
  
});

export default JobRow;
