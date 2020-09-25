import React from 'react';
// import {useState} from "react";
// import {reducer} from '../store/reducer';
import {connect} from 'react-redux';
import {add} from '../store/actions/Add';

function Button (props){

 
// const initialState = {
//     count :0
// }

// const [state , setState] = useState(initialState);

// const update = () => {
//     setState(prevState=>{
//         return {
//             count : prevState.count+1,
//         }
//     })
// }    

    return (
        <div>
            this is a Button {props.count}
            <button onClick={()=>props.add(5)}> click </button>           
        </div>
    )
    
}


const Subscriber = state =>{
    return {
        count:state.reducer.count,
    }
}

const Dispatcher = dispatch =>{
return{
    add: (val) => dispatch(add(val))
}
}


export default connect(Subscriber,Dispatcher)(Button);
