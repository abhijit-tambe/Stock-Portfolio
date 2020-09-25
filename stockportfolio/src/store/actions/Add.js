
import axios from 'axios';
const add= (val) =>{
return dispatch=> {
    // setTimeout(() => {
    //     
    // },5000);

    axios.get('http://localhost:9000/api/user/allusers').then(res=>{
        let count = res.data.count;
        dispatch(addAsync(count));
    })
}
}

const addAsync = (val) => {
    // console.log("requested");
    return {
    type: 'ADD_COUNT',
    value: val
}
}

export {add};