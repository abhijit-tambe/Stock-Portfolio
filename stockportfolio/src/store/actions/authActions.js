import axios from 'axios';
import * as actionTypes from './actionTypes';

const AUTH_START = (credentials)=>{
    console.log(credentials);
    return dispatch =>{
    axios.post('http://localhost:9000/api/user/login',credentials).then(x=>{
        console.log('x:',x);
        dispatch(AUTH_SUCCESS(x.data.token,x.data.userId));
    }).catch(err=>{
        dispatch(AUTH_FAIL(err));
    });
    }
}


const AUTH_SUCCESS = (token,userId)=>{
    console.log(token,userId);
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload:{
        token:token,
        userId:userId,
        isLoggedIn:true,
        error:null
        }
    }
}


const AUTH_FAIL = (error)=>{
    return {
        type: actionTypes.AUTH_FAIL,
        payload:{
        token:null,
        userId:null,
        error,
        isLoggedIn:false}
    }
}

export {
    AUTH_START
}