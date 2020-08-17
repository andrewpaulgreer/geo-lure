const initialState = {
  isloading: true,
  isSignedIn: false,
  currentUser: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log("signed in")
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
      };
    case "SIGN_OUT":
      console.log("signed out")
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth