import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { useDispatch } from "react-redux";

export default function LoginScreenHooks() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onSignIn = async () => {
    if (email && password) {
      // this.setState({isLoading: true})
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          // this.setState({isLoading: false})
          setIsLoading(false);
          dispatch({ type: "SIGN_IN", payload: response.user });
          // this.props.signIn(response.user)
          // this.props.navigation.navigate('LoadingScreen')
        }
      } catch (error) {
        // this.setState({isLoading: false})
        setIsLoading(false);
        switch (error.code) {
          case "auth/user-not-found":
            alert(
              "Hmmmm it seems we cannot find that email adress, try signing up or entering another email!"
            );
            break;
          case "auth/invalid-email":
            alert("Please enter an email address");
            break;
          case "auth/wrong-password":
            alert("I think you have the wrong password");
            break;
          default:
            alert(error.code);
        }
      }
    } else {
      alert("Seems to be the wrong password or email there..");
    }
  };

  const onSignUp = async () => {
    if (email && password) {
      // this.setState({isLoading: true})
      setIsLoading(true);
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (response) {
          // this.setState({isLoading: false})
          setIsLoading(false);

          //sign in user in db
          const user = await firebase
            .database()
            .ref("users/")
            .child(response.user.uid)
            .set({ email: response.user.email, uid: response.user.uid });

          alert("Thanks for signing up!");

          dispatch({ type: "SIGN_IN", payload: response.user });
          //navigate
        }
      } catch (error) {
        // this.setState({isLoading: false})
        setIsLoading(false);
        if (error.code == "auth/email-already-in-use") {
          alert("User already Exists. Try Logging In");
        }
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/EF-Local-Login.png")}
      style={styles.imageBackground}
    >
      {isLoading ? (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              elevation: 1000,
            },
          ]}
        >
          <ActivityIndicator size="large" color="#19ffa8" />
        </View>
      ) : null}
      <View style={{ marginTop: 50 }}>
        <TextInput
          style={styles.textInput}
          placeholder="username@email.com"
          placeholderTextColor="white"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        ></TextInput>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={onSignIn}>
          <View style={styles.loginBtn}>
            <Text style={styles.login}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>
            * Disclaimer: This app is only accessible for subscribers to
            easyfish local. If you are interested in a trial, please contact
            easyfish local!{" "}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: "center",
    fontSize: 40,
    color: "#00a7ff",
  },
  login: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  signup: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00a7ff",
  },
  textInput: {
    height: 70,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginHorizontal: 40,
    marginBottom: 20,
    paddingHorizontal: 15,
    color: "white",
    fontSize: 20
  },
  loginBtn: {
    width: 300,
    height: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderColor: "#EE1B24",
    borderWidth: 3,
    borderRadius: 10,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50
  },
  signupBtn: {
    width: 350,
    height: 70,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00a7ff",
    borderWidth: 3,
    borderRadius: 180,
    marginTop: 100,
  },
  imageBackground: {
    flex: 1,
  },
  disclaimer: {
    fontSize: 15,
    color: "white",
  },
  disclaimerContainer: {
    alignItems: "center",
    justifyContent: "center",

    height: 70,
    width: 350,
    borderColor: "white",
    marginTop: 15,
  },
});
