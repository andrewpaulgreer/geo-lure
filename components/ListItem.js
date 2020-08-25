import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import NetworkImage from "react-native-image-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
  return (
    <View style={[styles.listContainer, { marginVertical }]}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 5,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            marginTop: 5,
            marginBottom: 0,
            color: "white",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          {item.value}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              disabled={!editable}
              style={{ flex: 1 }}
              onPress={() => onPress(item)}
            >
              {item.image ? (
                <NetworkImage
                  source={{ uri: item.image }}
                  style={styles.image}
                  indicator={() => (
                    <AnimatedCircularProgress
                      size={100}
                      width={5}
                      fill={100}
                      tintColor="#00a7ff"
                      backgroundColor="#3e4544"
                    />
                  )}
                  indicatorProps={{
                    size: 70,
                    borderWidth: 0,
                    color: "#00a7ff",
                  }}
                  imageStyle={{ borderRadius: 35 }}
                />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Image
                    source={require("../assets/cam-icon-3.png")}
                    style={styles.placeholder}
                  ></Image>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </View>
  );
};

ListItem.defaultProps = {
  marginVertical: 5,
  editable: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: 180,
    width: 200,
    borderRadius: 35,
    marginBottom: 10,
  },
  placeholder: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  placeholderContainer: {
    height: 100,
    width: 150,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 5,
  },
  beforeAfterText: {
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
    height: 350,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#17252D",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "white",
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    margin: 5,
  },
});

export default ListItem;
