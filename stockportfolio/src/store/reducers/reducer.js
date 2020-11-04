const initialState = {
    count :0,
    age:27,
    location :['mumbai','New York','New Jersey']
}

const reducer = (state = initialState, actions)=>{
    // console.log(actions);
    switch(actions.type){
        case 'ADD_COUNT':  
        return {
            count: state.count+actions.value,
        }
        // case 'add': return {
        //     ...state,
        //     data: actions.payload,
        // }
        // case 'remove':
        // delete state.data;    
        // return {
        //     ...state
        // }
        // case 'addLocation':return {
        //     ...state,
        //     location : [...state.location].push(actions.payload.location),
        // }
        default: return state;
    }
    return state;
}

export  default reducer;