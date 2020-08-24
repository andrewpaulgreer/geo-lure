import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDrawNavigator from "./screens/DrawNavigator/CustomDrawComponent";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import CountContainer from "./redux/containers/CountContianer";
import JobsPosted from "./screens/HomeTabNavigator/JobsPosted";
import * as firebase from "firebase/app";
import "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./screens/SplashScreen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import useAuthenticateUser from "./hooks/useAuthenticateUser";
//giving stacknavigator to a variable
const Stack = createStackNavigator();
//giving drawnav to a variable
const Drawer = createDrawerNavigator();
//giving tab to variable
const Tab = createBottomTabNavigator();

export default function GeoLureHooks () {

useAuthenticateUser();
const auth = useSelector((state)=> state.auth);


  if (auth.isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
    {!auth.isSignedIn ? (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#17252D",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({route})=> ({
            title: "Login",
            headerTintColor: "white",
            fontSize: 30,
            headerBackTitleVisible: false,
         })}
          // options={{ headerBackTitleVisible: false, tabBarLabel: "Login" }}
        />
      </Stack.Navigator>
    ) : (
      <ActionSheetProvider>
        <AppDrawerNavigator />
      </ActionSheetProvider>
    )}
  </NavigationContainer>
);
  
}



const HomeTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "#00a7ff",
      inactiveTintColor: "white",
      style: { backgroundColor: "rgb(23, 37, 45)", justifyContent:'center', alignItems: "center" },
      labelStyle: {
        fontSize: 20,
        marginBottom: 10
      },
    }}
  >
    <Tab.Screen
      options={{ tabBarLabel: "Jobs To Post" }}
      name="jobsToPost"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{ tabBarLabel: "Jobs Posted" }}
      name="jobsPosted"
      component={JobsPosted}
    />
  </Tab.Navigator>
);


const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#17252d",
      },
      headerTintColor: "#00a7ff",
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="ios-menu"
          size={40}
          color="#EE1B24"
          style={{ marginLeft: 15}}
        />
      ),
      headerRight: ()=> (<Image source={require("./assets/roof.png")}
       style={styles.placeholder} ></Image> ),
      
    }}
  >
    <Stack.Screen 
    options={({route})=> ({
       title: "Easyfish Local",
       headerTintColor: "#17252d"
    })}
    name="HomeTabNavigator" component={HomeTabNavigator} />
  </Stack.Navigator>
);

const SettingsStackNavigator = ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#17252d",
        },
        headerTintColor: "white",
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={40}
            color="#EE1B24"
            style={styles.icon}
            
          />
        ),
      }}
    >
      <Stack.Screen 
      options={({route})=> ({
         title: "Settings" 
      })}
      name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );

const AppDrawerNavigator = ({navigation}) => (
  <Drawer.Navigator
  drawerContent={props => <CustomDrawNavigator {...props} />}
  >
    <Drawer.Screen name="Home" component={HomeStackNavigator} />
    <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
  </Drawer.Navigator>
);


const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    height: 32,
    width: 32,
    position: 'relative',
    right: 180,
    bottom: 5,
    resizeMode: 'contain'

  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 10,
  },
  icon: { 
    marginLeft: 15, 
    color:"#EE1B24"
  }
});