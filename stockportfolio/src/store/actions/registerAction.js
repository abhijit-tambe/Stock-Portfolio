import * as actionTypes from './actionTypes';
import axios from 'axios';

const ACCOUNT_REGISTER = (credentials)=> {
    return dispatch =>{
    axios.post('http://localhost:9000/api/user/register',credentials).then(x=>{
        if(x.status===200)
        dispatch(ACCOUNT_REGISTER_SUCCESS(x.data.message));
        else
        dispatch(ACCOUNT_REGISTER_FAIL(x.data.message));
    }).catch(err=>{
       
        dispatch(ACCOUNT_REGISTER_FAIL(err));
    })

    // dispatch()    
    }
}

const ACCOUNT_REGISTER_SUCCESS = (message)=>{
    return {
        type:actionTypes.ACCOUNT_REGISTER_SUCCESS,
        payload:{
            registerationSuccess:true,
            registerationMessage:message
        }
    }
}


const ACCOUNT_REGISTER_FAIL = (message)=>{
    console.log(message);
    return {
        type:actionTypes.ACCOUNT_REGISTER_FAIL,
        payload:{
            registerationFailure:true,
            registerationMessage:message
        }
    }
}


export default
    ACCOUNT_REGISTER;