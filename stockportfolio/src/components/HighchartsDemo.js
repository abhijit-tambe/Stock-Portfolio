import React from "react";
import ReactHighcharts from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import axios from 'axios';
import {useState ,useEffect} from 'react';
import getChartData from "../store/actions/GetChartData";
import {connect} from 'react-redux';


function Demo(props) {

   const [textValue,setTextValue] = useState(); 
//   const [state, setState] = useState({
//     title: {
//       text: 'My stock chart'
//     },
//     series: [{
//         data:[
//             // [1,2],[1,3],[2,3],[3,4],[5,6],[5,7],[6,9],[6,2],[7,1]
//         ]
//     }]
//   });
  
// let loadData = function(symbol){
//     console.log(symbol);

//     axios.get(`http://localhost:9000/api/stocks/${symbol}`).then(result=>{
//         console.log(result.data);
//         setState(prevState=>{
//             return {                
//                     title: {
//                       text: result.data[0]
//                     },
//                     series: [{
//                         data:result.data[1],
//                     }]
//         }
//     })

//     })
// }




  // return (
  //   <div>
  //     <h1>React HighCharts</h1>
  //     <input value = {textValue} placeHolder = "STOCK SYMBOL" onChange={e=>setTextValue(e.target.value)} type="text"></input>
  //     <button onClick={()=>loadData(textValue)}>search</button>
  //    <ReactHighcharts
  //     highcharts={Highcharts}
  //     constructorType={'stockChart'}
  //     options={chartData}
  //   />
  //   </div>
  // );
   return (
    <div>
      <h1>React HighCharts</h1>
      <input value = {textValue} placeHolder = "STOCK SYMBOL" onChange={e=>setTextValue(e.target.value)} type="text"></input>
      <button onClick={()=>props.update(textValue)}>search</button>
     <ReactHighcharts
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={props.chartData}
    />
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    chartData : state.chart
  }
}

const mapPropsToState = dispatch =>{
  return {
   update : val=>{
      dispatch(getChartData(val))
    }
  }
}



export default connect(mapStateToProps,mapPropsToState)(Demo);
