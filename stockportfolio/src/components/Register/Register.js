import React from 'react'
import './Register.css';
import  {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import {AUTH_START} from '../../store/actions/authActions';
import ACCOUNT_REGISTER from '../../store/actions/registerAction'
import { Typography } from '@material-ui/core';

function Register (){
    const store = useSelector(s => s.register);
    const dispatch = useDispatch();
    const [state , setState] = useState({email:null,password:null});
    const submitData = (e)=>{
        e.preventDefault();
        console.log(state);
        dispatch(ACCOUNT_REGISTER(state));
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

         {store.registerationSuccess && `register success :${store.registerationSuccess}`}
         {store.registerationFailure && `register failure :${store.registerationFailure}` }
         {store.registerationMessage && `message : ${store.registerationMessage}`}
         
            <form className="register__form" onSubmit={submitData}>
            <Typography component="h1" variant="h5">
          Create Account
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

export default Register;