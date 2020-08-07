import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database'
import ListItem from '../../components/ListItem'
import {connect} from 'react-redux'

class JobsPosted extends React.Component {

    renderItem = (item) => {
return <ListItem item={item} />
    }
render(){
    return(
        <View style={{flex:1, backgroundColor: "#3e4544"}} >
            {this.props.jobs.isLoadingJobs && (
          <View style={{...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', zIndex: 1000, elevation: 10000}}>
            <ActivityIndicator size="large" color="#00a7ff" />
          </View>
          )}
            <FlatList
            data={this.props.jobs}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
                !this.props.jobs.isLoadingJobs && (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  No Jobs Have Been Posted
                </Text>
              </View>
                )
            }
          />
        </View>
    )
}
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobsDone
    }
}

export default connect (mapStateToProps)(JobsPosted)