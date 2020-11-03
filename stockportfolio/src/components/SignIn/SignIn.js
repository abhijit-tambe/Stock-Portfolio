import React from 'react'
import './Register.css';
import  {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import {AUTH_START} from '../../store/actions/authActions';
import { Typography } from '@material-ui/core';


function SignIn (){
    const store = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const [state , setState] = useState({email:null,password:null});
    const submitData = (e)=>{
        e.preventDefault();
        console.log(state);
        dispatch(AUTH_START(state));
    }

    const updateValue =(e)=>{
        setState({...state,
        [e.target.name]: e.target.value});
    }
    // console.log('store:',store);

    return(
        <div className ='register'>
         {/* <div>{store.token && <p> token:das </p>}
         <br/> 
         {store.userId&& <p>user:store.userId </p>}
         <br/>
         {store.isLoggedIn && <p>logged:{store.isLoggedIn}</p>}
         <br/> 
         {store.error && <p> Error:{store.error}</p>}
         </div> */}
         {store.token && `token :${store.token}`}
         {store.error && `error :${store.error}` }
         {store.isLoggedIn && `error :${store.isLoggedIn}` }
        
            <form className="register__form" onSubmit={submitData}>
            <Typography component="h1" variant="h5">
          Sign in
        </Typography>
                <label htmlFor="email" >Username</label>
                <input type="text" name ="email" onChange={updateValue}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={updateValue}/>
                <input type="submit"/>
            </form>
           
        </div>
    );
}   

export default SignIn;