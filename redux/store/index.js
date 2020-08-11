import {createStore, combineReducers} from 'redux'
import jobsReducer from '../reducers/JobsReducer'
import authReducer from '../reducers/AuthReducer'
const store = createStore(combineReducers({
    jobs: jobsReducer,
    auth: authReducer
}))

export default store