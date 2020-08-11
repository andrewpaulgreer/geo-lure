import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import LottieView from 'lottie-react-native'
const SplashScreen = (props) => (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#3e4544"}}>
        <LottieView 
        source={require('../assets/splash.json')}
        autoPlay
        loop
        style={{height:200, width: 200}}
        />

    </View>
);

export default SplashScreen;