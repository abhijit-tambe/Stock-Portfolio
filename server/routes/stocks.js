const express = require('express');
const router = express.Router();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const fetch = require("node-fetch");
const API_KEY="VBQM4W9ASI86D2H7";
const https = require('https');
const axios = require('axios');

router.get("/:symbol",(req,res,next)=>{
    console.log(req.params.symbol);
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET",`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.symbol}&apikey=${API_KEY}`,true);
   
    // xhr.onload = function(){    
    //     console.log(xhr.responseText);
    //     // let data = JSON.parse(xhr.responseText);
    //     res.status(200).json(data);
    // }
    // xhr.send();
    // fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.symbol}&apikey=${API_KEY}`).then(result=>{
    // let data = JSON.parse(result);
    // console.log('data:',data);
    // res.status(200).json(data);
    // }).catch(error=>{
    //     console.log(error);
    // })
    // https.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.symbol}&apikey=${API_KEY}`,(result)=>{
    //     // console.log(JSON.stingify(result));
    //     // res.status(200).send(JSON.stringify(result));
    // } )

    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.symbol}&apikey=${API_KEY}`).then(result=>{
        // console.log(x.data);
        let data = result.data;
        // console.log(data['Time Series (Daily)']);
        let plotStock = [];
        let temp = result.data['Time Series (Daily)'];
        let close = '4. close';
        for(let time of Object.keys(temp)){
            let dateData =[];
            let timeArray =time.split("-");
            let date = new Date();
            date.setFullYear(timeArray[0]);
            date.setMonth(timeArray[1]);
            date.setDate(timeArray[2]);
            let timeSec = date.getTime();
            // console.log(timeSec);
            // console.log(temp[time]['4. close']); 
            dateData.push(timeSec,parseFloat(temp[time]['4. close']))
            plotStock.push(dateData);
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