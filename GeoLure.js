import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Stylesheet } from "react-native";
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDraw from "./screens/DrawNavigator/CustomDrawComponent";
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
            backgroundColor: "#3e4544",
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
          options={{ headerBackTitleVisible: false }}
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
      style: { backgroundColor: "#3e4544", justifyContent:'center', alignItems: "center" },
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
        backgroundColor: "#3e4544",
      },
      headerTintColor: "#00a7ff",
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="ios-menu"
          size={40}
          color="#d3d7d6"
          style={{ marginLeft: 10 }}
        />
      ),
    }}
  >
    <Stack.Screen 
    options={({route})=> ({
       title: "Geo Lure" 
    })}
    name="HomeTabNavigator" component={HomeTabNavigator} />
  </Stack.Navigator>
);

const SettingsStackNavigator = ({ navigation }) => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3e4544",
        },
        headerTintColor: "#00a7ff",
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={40}
            color="#d3d7d6"
            style={{ marginLeft: 10 }}
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

const AppDrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeStackNavigator} />
    <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
  </Drawer.Navigator>
);

