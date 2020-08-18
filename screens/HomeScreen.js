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
    <View style={{ flex: 1, backgroundColor: "#3e4544" }}>
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
              style={{ position: "absolute", bottom: 100, right: 100 }}
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

// class HomeScreen extends React.Component {
//   // const currentUser = useSelector(state=> state.auth.currentUser)

//   constructor(props) {
//     super(props);
//     this.state = {
//       // currentUser: {},
//       // jobsCount: 0,
//       // jobsDoneCount: 0,
//       // isAddJobVisible: false,
//       textInputData: "",
//       // jobs: [],
//       // jobsDone: [],
//       location: null,
//       errorMessage: '',
//       isLocationModalVisible: false,
//       appState: AppState.currentState
//     };
//     this.textInputRef = null;
//   }
// handleAppStateChange = (nextAppState)=> {
//   if(this.state.appState.match(/inactive|background/) && nextAppState ==='active'){
//     console.log('App has come to the foreground!')
//     this._getLocationAsync()
//   }
//   this.setState({appState: nextAppState})
// }

//   componentWillMount= async () => {
//     AppState.addEventListener('change',this.handleAppStateChange)
//     this._getLocationAsync()
//   }

//   componentWillUnmount(){
//     AppState.removeEventListener('change',this.handleAppStateChange)
//   }

//   _getLocationAsync = async () => {
//     try{
//       const {status} = await Permissions.askAsync(Permissions.LOCATION)
//       if(status !== 'granted'){
//           alert('You must have location enabled, to gain credit for the post')
          
//           this.setState({errorMessage: 'Permission Not Granted'})
//       } 
  
//       const location = await Location.getCurrentPositionAsync({});
  
//       this.setState({
//         location
//       })
  
//       console.log(location)
//   }
//   catch(error)
//   {
//     let status = Location.getProviderStatusAsync()
//     if(!status.locationServicesEnabled){
//       this.setState({isLocationModalVisible: true})
//     }
//   }

//   }

//   openSetting= ()=> {
//     if (Platform.OS == 'ios'){
//       Linking.openURL('app-settings')
//     } else {
//       IntentLauncherAndroid.startActivityAsync(
//         IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
//       )
//     }
//     this.setState({openSetting: false})
//   }

//   setLocation = async () => {
//     await firebase.database().ref('jobs').child(this.state.currentUser.uid).update(this.state.location)
//   }

//   componentDidMount = async () => {
 
//     const user = this.props.currentUser

//     const currentUserData = await firebase
//       .database()
//       .ref("users")
//       .child(user.uid)
//       .once("value");

//     const jobs = await firebase
//       .database()
//       .ref("jobs")
//       .child(user.uid)
//       .once("value");
//     const jobsArray = snapshotToArray(jobs);

//     this.setState({
//       currentUser: currentUserData.val(),
//     });

//     this.props.loadJobs(jobsArray.reverse());
//     // console.log(this.props.jobs);

//     this.props.toggleIsLoading(false);
//   };


        

//   showAddJob = () => {
//     this.setState({ isAddJobVisible: true });
//   };
//   cancelAddJob = () => {
//     this.setState({ isAddJobVisible: false });
//   };
//   addJob = async (job) => {
//     this.setState({ textInputData: "" });
//     this.textInputRef.setNativeProps({ text: "" });
//     try {
//       this.props.toggleIsLoading(true);
//       const snapshot = await firebase
//         .database()
//         .ref("jobs")
//         .child(this.state.currentUser.uid)
//         .orderByChild("name")
//         .equalTo(job);

//       const key = await firebase
//         .database()
//         .ref("jobs")
//         .child(this.state.currentUser.uid)
//         .push().key;

//       const response = await firebase
//         .database()
//         .ref("jobs")
//         .child(this.state.currentUser.uid)
//         .child(key)
//         .set({ name: job, completed: false, location: this.state.location});

//       this.props.addJob({ name: job, completed: false, location: this.state.location, key: key });
//       this.props.toggleIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       this.props.toggleIsLoading(false);
//     }
//   };

//   // markAsDone = async (selectedJob, index) => {
//   //   try {
//   //     await firebase
//   //       .database()
//   //       .ref("jobs")
//   //       .child(this.state.currentUser.uid)
//   //       .child(selectedJob.key)
//   //       .update({ completed: true, });
//   //     let newJob = this.state.jobs.filter(
//   //       (job) => job.name !== selectedJob.name
//   //     );

//   //     this.setState((prevState) => ({
//   //       jobs: newJob,
//   //       jobsDone: [
//   //         ...prevState.jobsDone,
//   //         { name: selectedJob.name, completed: true },
//   //       ],
//   //       // jobsCount: prevState.jobsCount - 1,
//   //       // jobsDoneCount: prevState.jobsDoneCount + 1
//   //     }));
//   //     this.props.markAsDone(selectedJob);
//   //     this.props.toggleIsLoading(false);
//   //   } catch (errors) {
//   //     console.log(error);
//   //     this.props.toggleIsLoading(false);
//   //   }
//   // };

//   // deleteJob = async (selectedJob, index) => {
//   //   try {
//   //     this.props.toggleIsLoading(true);
//   //     await firebase
//   //       .database()
//   //       .ref("jobs")
//   //       .child(this.state.currentUser.uid)
//   //       .child(selectedJob.key)
//   //       .remove();

//   //     this.props.deleteJob(selectedJob);
//   //     this.props.toggleIsLoading(false);
//   //   } catch (error) {
//   //     console.log(error);
//   //     this.props.toggleIsLoading(false);
//   //   }
//   // };

//   // uploadImage = async(image, selectedJob) => {
//   //   const ref = firebase.storage().ref().child(this.state.currentUser.uid).child(selectedJob.key)
//   //   try{
//   //     const blob = await ImageHelpers.prepareBlob(image.uri)
//   //     const snapshot = await ref.put(blob)

//   //     let downloadUrl = await ref.getDownloadURL()

//   //     await firebase.database().ref('jobs').child(this.state.currentUser.uid).child(selectedJob.key).update({image:downloadUrl})

//   //     blob.close()

//   //     return downloadUrl
//   //   } catch(error)
//   //   {
//   //     console.log(error)
//   //   }
//   // }

//   // openImageLibrary = async(selectedJob) => {
//   //   const result = await ImageHelpers.openImageLibrary();
//   //   if(result){
//   //     console.log('response: ', result);
//   //     // console.log('response latitude: ', result.latitude);
//   //     // console.log('response longitude: ', result.longitude);
//   //     this.props.toggleIsLoading(true)
//   //     const downloadUrl = await this.uploadImage(result, selectedJob)
//   //     this.props.updateJobImage({...selectedJob, uri: downloadUrl})
//   //     this.props.toggleIsLoading(false)

//   //   }
//   // }

//   // openCamera = async(selectedJob) => {
//   //   const result = await ImageHelpers.openCamera();
//   //   if(result){
//   //     console.log('response: ', result);
//   //     this.props.toggleIsLoading(true)
//   //     const downloadUrl = await this.uploadImage(result, selectedJob)
//   //     this.props.updateJobImage({...selectedJob, uri: downloadUrl})
//   //     this.props.toggleIsLoading(false)
//   //   }
//   // }


//   // addImage = (selectedJob) => {
//   //   const options = ["select from photos", "open camerea", "cancel"];
//   //   const cancelButtonIndex = 2;

//   //   this.props.showActionSheetWithOptions(
//   //     {
//   //       options,
//   //       cancelButtonIndex,
//   //     },
//   //     (buttonIndex) => {
//   //       if (buttonIndex == 0) {
//   //         this.openImageLibrary(selectedJob)
//   //       } else if (buttonIndex == 1) {
//   //         this.openCamera(selectedJob)
//   //       }
//   //     }
//   //   );
//   // };


//   // renderItem = (item, index) => {
//   //   let swipeoutButtons = [
//   //     {
//   //       text: "delete",
//   //       component: (
//   //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//   //           <Ionicons name="ios-trash" size={40} color="white"   />
//   //         </View>
//   //       ),
//   //       backgroundColor: "red",
//   //       onPress: () => this.deleteJob(item, index)
//   //     },
//   //   ]

//   //   return (
//   //     <Swipeout
//   //       autoClose={true}
//   //       style={{ marginHorizontal: 5, marginVertical: 5}}
//   //       backgroundColor="#3e4544"
//   //       right={swipeoutButtons}
//   //     >
//   //       <ListItem editable={true} marginVertical={0} item={item} onPress={() => this.addImage(item)}>
          
//   //         {item.completed ? (
//   //           <Ionicons name="ios-checkmark" color="green" size={50} />
//   //         ) : (
//   //           <TouchableOpacity onPress={() => this.markAsDone(item, index)}>
//   //             <View style={styles.postBtn}>
//   //               <Text style={{ color: "#00a7ff", fontSize: 20 }}>Post Job</Text>
//   //             </View>
//   //           </TouchableOpacity>
//   //         )}
//   //       </ListItem>
//   //     </Swipeout>
//   //   );
//   // };

//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#3e4544" }}>
//         <SafeAreaView />
//         {/* <View
//           style={{
//             height: 70,
//             borderBottomWidth: 0.5,
//             borderBottomColor: "#7b48b4",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text style={{ fontSize: 30, color: "#00a7ff" }}>Geo Lure</Text>
//         </View> */}
//         <Modal onModalHide={this.state.openSetting? this.openSetting:undefined} isVisible = {this.state.isLocationModalVisible}>
//           <View style={{height:300, width: 400, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}}>
//             <Button onPress={()=> this.setState({isLocationModalVisible: false, openSetting: true})}
//             title="Enable Location Services"/>
//           </View>
//         </Modal>
//         <View style={{ flex: 1 }}>
//           {this.props.jobs.isLoadingJobs && (
//             <View
//               style={{
//                 ...StyleSheet.absoluteFill,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 zIndex: 1000,
//                 elevation: 10000,
//               }}
//             >
//               <ActivityIndicator size="large" color="#00a7ff" />
//             </View>
//           )}
//           <View style={{ height: 50, flexDirection: "row", margin: 5 }}>
//             <TextInput
//               style={styles.jobInput}
//               placeholder="Enter Job"
//               placeholderTextColor="#d3d3d3"
//               onChangeText={(text) => this.setState({ textInputData: text })}
//               ref={(component) => {
//                 this.textInputRef = component;
//               }}
//             />
//           </View>

//           <FlatList
//             data={this.props.jobs.jobs}
//             // addin in row here where the upload data is under the row component
//             renderItem={({ item }, index) => (<JobRow item={item} index={index} />)}
//             keyExtractor={(item, index) => index.toString()}
//             ListEmptyComponent={
//               !this.props.jobs.isLoadingJobs && (
//                 <View style={{ marginTop: 50, alignItems: "center" }}>
//                   <Text style={{ fontWeight: "bold" }}>
//                     No Jobs Currently In Process
//                   </Text>
//                 </View>
//               )
//             }
//           />

//           <Animatable.View
//             animation={
//               this.state.textInputData.length > 0
//                 ? "bounceInRight"
//                 : "bounceOutRight"
//             }
//           >
//             <TouchableOpacity
//               style={{ position: "absolute", bottom: 100, right: 100 }}
//               onPress={() => this.addJob(this.state.textInputData)}
//             >
//               <View
//                 style={{
//                   width: 200,
//                   height: 200,
//                   borderRadius: 100,
//                   backgroundColor: "#19ffa8",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Text style={{ color: "white", fontSize: 75 }}>+</Text>
//               </View>
//             </TouchableOpacity>
//           </Animatable.View>
//         </View>
//         {/* <View
//           style={{
//             height: 70,
//             borderTopWidth: 0.5,
//             borderBottomColor: "#7b48b4",
//           }}
//         >
//           <History
//             count={this.state.jobs.length}
//             posted={this.state.jobsDone.length}
//           />
//         </View> */}
//         <SafeAreaView />
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     jobs: state.jobs,
//     currentUser: state.auth.currentUser
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadJobs: (jobs) =>
//       dispatch({
//         type: "LOAD_JOBS",
//         payload: jobs,
//       }),
//     markAsDone: (job) => dispatch({ type: "MARK_AS_DONE", payload: job }),
//     addJob: (job) => dispatch({ type: "ADD_JOB", payload: job }),
//     markJobAsNotDone: (job) =>
//       dispatch({ type: "MARK_JOB_AS_NOT_DONE", payload: job }),
//     toggleIsLoading: (bool) =>
//       dispatch({ type: "TOGGLE_IS_LOADING", payload: bool }),
//     deleteJob: (job) => dispatch({ type: "DELETE_JOB", payload: job }),
//     updateJobImage: job => dispatch({type: 'UPDATE_IMAGE', payload: job})
//   };
// };

// const wrapper = compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   connectActionSheet
// );

// export default wrapper(HomeScreen);

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
