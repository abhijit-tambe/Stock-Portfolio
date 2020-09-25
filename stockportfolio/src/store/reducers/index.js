import {combineReducers} from 'redux'; 
import reducer from './reducer'
import chart from './Chart'

const rootReducer = combineReducers({
    reducer : reducer,
    chart :chart
})

export default rootReducer;