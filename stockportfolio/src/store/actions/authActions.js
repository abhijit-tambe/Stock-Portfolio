import axios from 'axios';


const AUTH_START = (credentials)=>{
    axios.post('http://localhost:9000/api/user/login',credentials).then(x=>{
        console.log(x);
        dispatch(AUTH_SUCCESS(x.token,x.userId));
    }).catch(err=>{
        dispatch(AUTH_FAIL(err));
    })
}


const AUTH_SUCCESS = (token,userId)=>{
    return {
        token,
        userId
    }
}


const AUTH_FAIL = (error)=>{
    return {
       error
    }
}