const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/jwtAuth");
const mongoose = require("mongoose");
const Portfolio = require("../models/portfolio");
const Stock = require("../models/stock");

router.post("/newPortfolio", checkAuth, (req, res, next) => {
  const userData = req.userData;
  console.log("stocks : ", req.body.stocks);
  const stocks = [];
  for (let i = 0; i < req.body.stocks.length; i++) {
    const stock = {
      _id: mongoose.Types.ObjectId(),
      symbol: req.body.stocks[i].symbol,
      purchasePrice: req.body.stocks[i].purchasePrice,
      shares: 0,
      priceWhenAdded: req.body.stocks[i].currentPrice,
    };
    stocks.push(stock);
  }
  const portfolio = new Portfolio({
    _id: mongoose.Types.ObjectId(),
    portfolioName: req.body.portfolioName,
    email: userData.email,
    userId: userData.userId,
    stocks: stocks,
  });
  portfolio
    .save()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        doc,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.get("/allPortfolios", (req, res, next) => {
  const portfolio = Portfolio.find()
    // .select("portfolioName email stocks")
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});
router.post("/deleteStock", checkAuth, (req, res, next) => {
  console.log(req.body.stockId);
  Portfolio.updateOne(
    { _id: req.body.portfolioId },
    { $pull: { stocks: { _id: req.body.stockId } } },
    { safe: true }
  )
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({
        message: "stock deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.post("/addStocks", checkAuth, (req, res, next) => {
  console.log(req.body.stockId);
  const stocks = [];
  for (let i = 0; i < req.body.stocks.length; i++) {
    const stock = {
      _id: mongoose.Types.ObjectId(),
      symbol: req.body.stocks[i].symbol,
      purchasePrice: req.body.stocks[i].purchasePrice,
      shares: 0,
      priceWhenAdded: req.body.stocks[i].currentPrice,
    };
    stocks.push(stock);
  }

  Portfolio.findByIdAndUpdate(
    { _id: req.body.portfolioId },
    { $push: { stocks: stocks } }
  )
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: "stocks updated",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;
