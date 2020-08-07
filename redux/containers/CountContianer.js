import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

import {connect} from 'react-redux'


const CountContainer = ({ ...props}) => {
        <View style={{flex:1, backgroundColor: "#3e4544"}} >
            <Text style={{color: "white"}}>
                {props.books.type || 0 }
            </Text>
        </View>
    

}

const mapStateToProps = state => {
    return{
        jobs: state.jobs
    }
    }
export default connect (mapStateToProps)(CountContainer)