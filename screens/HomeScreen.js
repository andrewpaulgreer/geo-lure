import { StatusBar } from "expo-status-bar";
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import React, { Component,  useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Linking,
  Platform,
  AppState,
   Button
} from "react-native";
import ListItem from "../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import "firebase/storage"
import { snapshotToArray } from "../helpers/firebaseHelpers";
import * as Animatable from "react-native-animatable";
import * as ImageHelpers from '../helpers/ImageHelpers'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as Constants from 'expo-constants'
import Modal from 'react-native-modal'
import * as IntentLauncherAndroid from 'expo-intent-launcher'
import JobRow from '../components/Row'
import {loadJobs, toggleIsLoading, addJob} from '../redux/actions'

export default function HomeScreenHooks (){
  const [textInputData, setTextInputData] = useState("");
  const [location, setLocationHook] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLocationModalVisible, setIsLocationModuleVisisble] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [ openSettings, setOpenSettings] = useState(false)
  const textInputRef = useRef()

  const user = useSelector(state=> state.auth.currentUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    async function fetchJobs(){
  
    const jobs = await firebase
      .database()
      .ref("jobs")
      .child(user.uid)
      .once("value");
    const jobsArray = snapshotToArray(jobs);

   
    dispatch(loadJobs(jobsArray.reverse()))
    // this.props.loadJobs(jobsArray.reverse());
    // console.log(this.props.jobs);
    dispatch(toggleIsLoading(false))
    // this.props.toggleIsLoading(false);
    }
    fetchJobs();
  }, [dispatch, user]);
  
  const {isLoadingJobs, jobs} = useSelector(state=> state.jobs)

  const handleAppStateChange = (nextAppState)=> {
    if(appState.match(/inactive|background/) && nextAppState ==='active'){
      console.log('App has come to the foreground!')
      _getLocationAsync();
    }
    setAppState(nextAppState)
    // this.setState({appState: nextAppState})
  }
  useEffect(()=> {
    
      AppState.addEventListener('change',handleAppStateChange)
    _getLocationAsync()
    
   
    return ()=> {
      AppState.removeEventListener('change',handleAppStateChange)
    }
  }, [])

 const _getLocationAsync = async () => {
    try{
      const {status} = await Permissions.askAsync(Permissions.LOCATION)
      if(status !== 'granted'){
          alert('You must have location enabled, to gain credit for the post')
          setErrorMessage('permission not granted')
          // this.setState({errorMessage: 'Permission Not Granted'})
      } 
  
      const location = await Location.getCurrentPositionAsync({});
      
      setLocationHook(location)

      console.log(location)
  }
  catch(error)
  {
    let status = Location.getProviderStatusAsync()
    if(!status.locationServicesEnabled){
      setIsLocationModuleVisisble(true)
      // this.setState({isLocationModalVisible: true})
    }
  }

  }

//  const openSetting= ()=> {
//     if (Platform.OS == 'ios'){
//       Linking.openURL('app-settings')
//     } else {
//       IntentLauncherAndroid.startActivityAsync(
//         IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
//       )
//     }
//     setOpenSettings(false)
//     // this.setState({openSetting: false})
//   }

 const setLocation = async () => {
    await firebase.database().ref('jobs').child(user.uid).update(location)
  }

  const handleAddJob = async (job) => {
   setTextInputData('')
    textInputRef.current.setNativeProps({text: ''})
    try {
      dispatch(toggleIsLoading(true))
      // this.props.toggleIsLoading(true);
      const snapshot = await firebase
        .database()
        .ref("jobs")
        .child(user.uid)
        .orderByChild("name")
        .equalTo(job);

      const key = await firebase
        .database()
        .ref("jobs")
        .child(user.uid)
        .push().key;

      const response = await firebase
        .database()
        .ref("jobs")
        .child(user.uid)
        .child(key)
        .set({ name: job, completed: false, location: location});
      dispatch(addJob({ name: job, completed: false, location, key: key }))
      // this.props.addJob({ name: job, completed: false, location: this.state.location, key: key });
      dispatch(toggleIsLoading(false))
      // this.props.toggleIsLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(toggleIsLoading(false))
      // this.props.toggleIsLoading(false);
    }
  };

  return(
    <View style={{ flex: 1, backgroundColor: "#17252D" }}>
        <SafeAreaView />
        {/* <Modal onModalHide={this.state.openSetting? this.openSetting:undefined} isVisible = {this.state.isLocationModalVisible}>
          <View style={{height:300, width: 400, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}}>
            <Button onPress={()=> this.setState({isLocationModalVisible: false, openSetting: true})}
            title="Enable Location Services"/>
          </View>
        </Modal> */}
        <View style={{ flex: 1 }}>
          {isLoadingJobs && (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 10000,
              }}
            >
              <ActivityIndicator size="large" color="#00a7ff" />
            </View>
          )}
          <View style={{ height: 50, flexDirection: "row", margin: 5 }}>
            <TextInput
              style={styles.jobInput}
              placeholder="Enter Job"
              placeholderTextColor="#d3d3d3"
              onChangeText={(text) => setTextInputData(text)}
              ref={textInputRef}
            />
          </View>

          <FlatList
            data={jobs}
            // addin in row here where the upload data is under the row component
            renderItem={({ item }, index) => (<JobRow item={item} index={index} />)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              !isLoadingJobs && (
                <View style={{ marginTop: 50, alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold" }}>
                    No Jobs Currently In Process
                  </Text>
                </View>
              )
            }
          />

          <Animatable.View
            animation={
              textInputData.length > 0
                ? "bounceInRight"
                : "bounceOutRight"
            }
          >
            <TouchableOpacity
              style={{ position: "absolute", bottom: 100, right: 85 }}
              onPress={() => handleAddJob(textInputData)}
            >
              <View
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  backgroundColor: "#19ffa8",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 75 }}>+</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </View>
        <SafeAreaView />
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
  postBtn: {
    width: 350,
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    borderColor: "#00a7ff",
    borderWidth: 3,
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
});