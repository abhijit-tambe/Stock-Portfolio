const express = require('express');
const router = express.Router();
const API_KEY="VBQM4W9ASI86D2H7";
const axios = require('axios');

router.get("/:symbol",(req,res,next)=>{
    console.log(req.params.symbol);
 
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.symbol}&outputsize=full&apikey=${API_KEY}`).then(result=>{
        // console.log(x.data);
        let data = result.data;
        // console.log(data['Time Series (Daily)']);
        let plotStock = [];
        plotStock[0]= result.data["Meta Data"]["2. Symbol"];
        plotStock[1] = [];
        let count =0;
        let temp = new Map();
        // result.data['Time Series (Daily)'];
       
        for(let key of Object.keys(result.data['Time Series (Daily)'])){
            // console.log(key);
            if(count<365){
            count++;
            temp.set(key,result.data['Time Series (Daily)'][key]);
            }
            else{
                break ;
            }
        }
        // console.log('temp');
        let close = '4. close';
        for(let time of temp.keys()){
            // console.log(temp.get(time)[close]);
            let dateData =[];
            let timeArray =time.split("-");
            // console.log(timeArray);
            let date = new Date();
            date.setFullYear(timeArray[0],timeArray[1]-1,timeArray[2]);
            // date.setMonth();
            // date.setDate();
            // console.log(timeArray[1]);
            // console.log(date);
            let timeSec = date.getTime();
            // // console.log(timeSec);
            // // console.log(temp[time]['4. close']); 
            // dateData.push(timeSec,parseFloat(temp[time]['4. close']))
            dateData.push(timeSec,parseFloat(temp.get(time)[close]));
            // // console.log(temp[time]['4. close']);
            plotStock[1].push(dateData);
        }



        res.status(200).json(plotStock);
    }).catch(error=>{
        console.log(error);
    })
})


router.get('/symbols',(req,res,next)=>{
    axios.get("")
})


module.exports = router;