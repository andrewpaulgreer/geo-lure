import {useEffect} from 'react'

import {useDispatch} from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'


export default function useAuthenticateUser (){
const dispatch = useDispatch()

useEffect(()=> {
    let unsubscribe;
    try {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //sign in
          // this.props.signIn(user);
          dispatch({type: "SIGN_IN", payload:user})
        } else {
          console.log("No user signed in");
        //   this.props.signOut();
        dispatch({type: "SIGN_OUT"})
        }
        unsubscribe();
      });
    } catch (e) {
      // this.props.signOut();
      dispatch({type: "SIGN_OUT"})
    }
  }, [dispatch])
}