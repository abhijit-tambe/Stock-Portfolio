import * as actionTypes from '../actions/actionTypes';

const initialState= {
    token:null,
    userId:null,
    loading:null,
    error:null,
    isLoggedIn:false,
}


const authReducer = (state= initialState, action)=>{
    // console.log(action);
    switch(action.type){
        // case actionTypes.AUTH_SUCCESS:
        case actionTypes.AUTH_SUCCESS:
            console.log('action');
            return{
                ...state,
                ...action.payload
            };
        case actionTypes.AUTH_FAIL:
            console.log(action.payload.error.response.data.message);
            return{
                ...state,
                ...action.payload
            };
        default:
            return {
                ...state,
            }    
    }
}

export default authReducer;