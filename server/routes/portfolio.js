const express = require("express");
const router = express.Router();
const auth = require("../middleware/jwtAuth");

const PortfolioController = require('../controller/portfolioController');

const portfolioController = new PortfolioController();

//required to handle portfolio routes
router.post('/create',auth,(req,res)=> portfolioController.createPortfolio(req,res));// r & d
router.get('/all',auth,(req,res)=> portfolioController.getAllUserPortfolios(req,res));// r & d 
router.patch('/update',auth,(req,res)=> portfolioController.updateNameInPortfolio(req,res));// r & d
router.delete('/delete/:id',auth,(req,res)=> portfolioController.deletePortfolioById(req,res));// r & d
// optional
router.get('/:id',auth,(req,res)=> portfolioController.getPortfolioById(req,res));// o & d


//required to handle embeded stock routes
router.post('/stock/add',auth,(req,res)=> portfolioController.addStockInPortfolio(req,res));// r & d
router.patch('/stock/update',auth,(req,res)=> portfolioController.updatestockInPortfolio(req,res));// r & d
router.delete('/stock/delete/:id',auth,(req,res)=> portfolioController.deletestockInPortfolio(req,res));// r & d
//optional
router.post('/stock/multiadd',auth,(req,res)=> portfolioController.addMultiStockInPortfolio(req,res));// o & d

module.exports =router;