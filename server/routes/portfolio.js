const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/jwtAuth");
// const mongoose = require("mongoose");
// const Portfolio = require("../models/portfolio");
// const Stock = require("../models/stock");
const PortfolioController = require('../controller/portfolioController');

const portfolioController = new PortfolioController();

// router.post('/create',(req,res)=> portfolioController.createPortfolio(req,res));
// router.get('/all',(req,res)=> portfolioController.getAllPortfolio(req,res));
// router.get('/:id',(req,res)=> portfolioController.getPortfolioById(req,res));
// router.post('/stock',(req,res)=> portfolioController.addStockToPortfolio(req,res));
// router.post('/stocks',(req,res)=> portfolioController.addMultiStockToPortfolio(req,res));
// router.put('/delstock',(req,res)=> portfolioController.deletestockFromPortfolio(req,res));


//handle portfolio
router.post('/create',(req,res)=> portfolioController.createPortfolio(req,res));// required && done refactored
router.get('/all',(req,res)=> portfolioController.getAllPortfolios(req,res));// done refactored
router.get('/:id',(req,res)=> portfolioController.getPortfolioById(req,res));// required && done refactored
router.patch('/update',(req,res)=> portfolioController.updateNameInPortfolio(req,res));// required refactored
router.delete('/delete/:id/:pid',(req,res)=> portfolioController.deletePortfolioById(req,res));// required && done refactored

//handle embeded stock in portfolio
router.post('/stock/add',(req,res)=> portfolioController.addStockInPortfolio(req,res));// required && done refactored
router.post('/stock/multiadd',(req,res)=> portfolioController.addMultiStockInPortfolio(req,res));// done refactiored
router.patch('/stock/update',(req,res)=> portfolioController.updatestockInPortfolio(req,res));// required && done refactored
router.delete('/stock/delete/:id',(req,res)=> portfolioController.deletestockInPortfolio(req,res));//required && done refactored





module.exports =router;