const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/jwtAuth");
// const mongoose = require("mongoose");
// const Portfolio = require("../models/portfolio");
// const Stock = require("../models/stock");
const PortfolioController = require('../controller/portfolioController');

const portfolioController = new PortfolioController();

router.post('/create',(req,res)=> portfolioController.createPortfolio(req,res));
router.get('/all',(req,res)=> portfolioController.getAllPortfolio(req,res));

module.exports =router;