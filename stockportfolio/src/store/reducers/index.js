import {combineReducers} from 'redux'; 
import reducer from './reducer'
import chart from './Chart'
import auth from './authReducer';
import register from './registerReducer';
const rootReducer = combineReducers({
    reducer : reducer,
    chart :chart,
    auth:auth,
    register

})

export default rootReducer;