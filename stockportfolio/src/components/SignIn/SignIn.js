import React from 'react'
import './SignIn.css';
import  {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import {AUTH_START} from '../../store/actions/authActions';
import { Typography } from '@material-ui/core';
import logo from '../../stock logo.png'
import {Link,useHistory} from 'react-router-dom'
import { useEffect } from 'react';

function SignIn (){
    const store = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const [state , setState] = useState({email:null,password:null});
    const history = useHistory();

    const submitData = async (e)=>{
        e.preventDefault();
        console.log(state);
       dispatch(AUTH_START(state));
    }

    useEffect(()=>{
        if(store.isLoggedIn){
            history.push(`/${store.userId}`);
        }
    })

    const updateValue =(e)=>{
        setState({...state,
        [e.target.name]: e.target.value});
    }
    // console.log('store:',store);

    return(
        <div className ='signIn'>
        <Link to ="/">
            <img className="signIn__logo" src ={logo}/>
        </Link>
         {/* {store.token && <div>{`token :${store.token}`}</div>} */}
         {store.error && <div className="signIn__error signIn__message"><p>{`error :${store.error}`}</p></div> }
         {store.isLoggedIn && <div className="signIn__success signIn__message"><p>{`Logged in successfully :${store.isLoggedIn}`} </p></div>}
         {/* {store.isLoggedIn && <Redirect push to={`/${store.userId}`}/>} */}
         <div className="signIn__container">
        
         <Typography className="signIn__title" component="h1" variant="h5">
          Sign in
        </Typography>
            <form className="signIn__form" onSubmit={submitData}>
                <label htmlFor="email" >Username</label>
                <input type="text" name ="email" onChange={updateValue}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={updateValue}/>
                <button className="signIn__button" type="submit">Sign In</button>
            </form>
            <div>
                <Typography component="h6" variant="h6" className="signIn__createAccountTitle"> Don't have an Account?</Typography>
                <Link to="/register">
                <button className="signIn__button signIn_newAccount"> Create an Account </button>
                </Link>
                
            </div>

            </div>
        </div>
    );
}   

export default SignIn;