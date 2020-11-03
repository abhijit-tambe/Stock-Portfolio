import * as actionTypes from '../actions/actionTypes';

const initialState = {
    registerationSuccess:null,
    registerationFailure:null,
    registerationMessage:null
}


const registerReducer =(state = initialState, action)=>{
    
    switch(action.type){
        
        case actionTypes.ACCOUNT_REGISTER_SUCCESS:
            console.log('payload',action.payload);
            return {
                registerationFailure:null,
                ...action.payload
            };
        case actionTypes.ACCOUNT_REGISTER_FAIL:
            console.log('message',action.payload.registerationMessage.response.data.message);
            return { 
                registerationSuccess:null,
                registerationMessage:action.payload.registerationMessage.response.data.message,
                registerationFailure:true
            }
        default:
            return state;
    }
}

export default registerReducer;