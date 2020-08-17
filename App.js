import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import GeoLure from './GeoLure'

import { firebaseConfig } from "./config/config";

import firebase from "firebase/app"
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <Provider store={store}>
        <GeoLure />
    </Provider>
  ); 
}



