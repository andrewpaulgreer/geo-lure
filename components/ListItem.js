import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import NetworkImage from 'react-native-image-progress'
import {AnimatedCircularProgress} from 'react-native-circular-progress'

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
            marginBottom: 10,
          }}
        >
          {item.name}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              disabled={!editable}
              style={{ flex: 1 }}
              onPress={() => onPress(item)}
            >
                {item.image?(
                <NetworkImage source={{uri:item.image}} style={styles.image} 
                indicator={()=> <AnimatedCircularProgress
                size={100}
                width={5}
                fill={100}
                tintColor="#00a7ff"
                backgroundColor="#3e4544"
                    /> }
                indicatorProps={{
                    size:70,
                    borderWidth: 0,
                    color: "#00a7ff"
                }}
                imageStyle={{borderRadius: 35}}
                />
                 ) :(
              <Image
                source={require("../assets/icon.png")}
                style={styles.image}
              ></Image>
                 )}
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
          <TouchableOpacity
              disabled={!editable}
              style={{ flex: 1 }}
              onPress={() => onPressTwo(item)}
            >
                {item.image?(
                <NetworkImage source={{uri:item.image}} style={styles.image} 
                indicator={()=> <AnimatedCircularProgress
                size={100}
                width={5}
                fill={100}
                tintColor="#00a7ff"
                backgroundColor="#3e4544"

                    /> }
                indicatorProps={{
                    size:70,
                    borderWidth: 0,
                    color: "#00a7ff"
                }}
                imageStyle={{borderRadius: 35}}
                />
                 ) :(
              <Image
                source={require("../assets/icon.png")}
                style={styles.image}
              ></Image>
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
    height: 150,
    width: 170,
    borderRadius: 35,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 5
  },
  beforeAfterText: {
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
    height: 300,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
  },
});

export default ListItem;
