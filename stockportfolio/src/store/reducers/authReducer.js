import * as actionTypes from '../actions/actionTypes';

const initialState= {
    token:null,
    userId:null,
    loading:null,
    error:null,
}


const authReducer = (state= initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                ...action.payload
            };
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                ...action.payload
            };


    }
}