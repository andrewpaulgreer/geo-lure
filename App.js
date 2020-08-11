import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDraw from "./screens/DrawNavigator/CustomDrawComponent";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";
import CountContainer from "./redux/containers/CountContianer";
import JobsPosted from "./screens/HomeTabNavigator/JobsPosted";
import { Provider } from "react-redux";
import store from "./redux/store";
import GeoLure from './GeoLure'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";


import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";
import { Colors } from "react-native/Libraries/NewAppScreen";


/**
 * AppSwitchNav
 *  WelcomeScreen
 *   -signup
 *  HomeScreen
 */
class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }



  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return (
      <Provider store={store}>
          <GeoLure />
      </Provider>
    );
  }
}

const loginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {},
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#3e4544",
      },
    },
  }
);
const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Jobs To Post",
        tabBarIcon: (type) => {
          <CountContainer color="white" type="jobs" />;
        },
      },
    },
    JobsPosted: {
      screen: JobsPosted,
      navigationOptions: {
        tabBarLabel: "Jobs Posted",
        tabBarIcon: (type) => {
          <CountContainer color="white" type="jobsDone" />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
      },
      style: {
        backgroundColor: "#3e4544",
      },
      activeTintColor: "#00a7ff",
      inactiveTintColor: "white",
    },
    tabBarIcon: {
      style: {
        backgroundColor: "#3e4544",
      },
      activeTintColor: "#00a7ff",
      inactiveTintColor: "white",
    },
  }
);

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case "HomeScreen":
      return {
        headerTitle: "Geo-Lure",
      };
    case "JobsPosted":
      return {
        headerTitle: "Jobs Posted",
      };
    default:
      return {
        headerTitle: "Geo-Lure",
      };
  }
};

const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: {
      screen: HomeTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Ionicons
              name="ios-menu"
              size={30}
              color="#d3d7d6"
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#3e4544",
      },
      headerTintColor: "#00a7ff",
    },
  }
);

const AppDrawnavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />,
      },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      },
    },
  },
  {
    contentComponent: CustomDraw,
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  loginStackNavigator,
  AppDrawnavigator,
  LoadingScreen,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
