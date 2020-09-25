import axios from 'axios';

const getChartData =(symbol)=>{
    return dispatch=>{
        axios.get(`http://localhost:9000/api/stocks/${symbol}`).then(res=>{
            if(res){
                let data = res.data;
                dispatch(getChartDataAsync(data));
            }
                    
        })
        
    }

}

const getChartDataAsync = (data)=>{
    return {
        type:"UPDATE",
        payload: {data}
    }


}

export default getChartData;

