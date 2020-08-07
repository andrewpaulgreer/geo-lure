import {createStore, combineReducers} from 'redux'
import jobsReducer from '../reducers/JobsReducer'

const store = createStore(combineReducers({
    jobs: jobsReducer
}))

export default store