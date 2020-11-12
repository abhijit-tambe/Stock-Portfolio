const e = require("express");
const PortfolioService = require("../service/portfolioService");
const UserService = require("../service/userService");

const portfolioService = new PortfolioService();
const userService = new UserService();

class PortfolioController {
  async createPortfolio(req, res) {
    let data = req.body;
    console.log("portfolioController", data);
    try {
      let portfolioExist = await portfolioService.getPortfolio(data.name);
      if (portfolioExist < 1) {
        let newPortfolio = await portfolioService.createPortfolio(data);
        let updateUserPortfolio = await userService.addUserPortfolio(
          data.userId,
          newPortfolio._id
        );
        if (updateUserPortfolio) {
          res.status(200).json(updateUserPortfolio);
        } else {
          res.status(500).json({ message: "error occured1" });
        }
      } else {
        res.status(500).json({ message: "portfolio name already exist" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  deletePortfolio(req, res) {}

  updatePortfolio(req, res) {}

  async getPortfolioById(req, res) {
    try {
      let id = req.params.id;
      let portfolio = await portfolioService.getPortfolioById(id);
      if (portfolio) {
        res.status(200).json(portfolio);
      } else {
        res.status(404).json({ message: "portfolio does not exist" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async getAllPortfolio(req, res) {
    console.log("all portfolios");
    try {
      let portfolios = await portfolioService.getAllPortfolios();
      res.status(200).json(portfolios);
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }



  async addStockInPortfolio(req, res) {
    try {
      let stockAdded = await portfolioService.addStock(req.body);
      if(stockAdded.nModified===1){
        console.log("stock added", stockAdded);
        res.status(200).json({message:"stock added"});
      }else{
        res.status(500).json({message:"error adding stock"});
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async addMultiStockInPortfolio(req, res) {
    try {
      let stocksAdded = await portfolioService.addMultiStock(
        req.body
      );
      if (stocksAdded.nModified===1) {
        res.status(200).json({message:"stocks added"});
      } else {
        res.status(500).json({ message: "error" });
      }
      // console.log('stocks added',stockAdded);
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }
  
  async updatestockInPortfolio(req, res) {
    try {
      let stockUpdated = await portfolioService.updateStock(req.body);
      if(stockUpdated.nModified===1){
      console.log("stock updated", stockUpdated);
      res.status(200).json({message:"stock updated"});}
      else{
        console.log("stock not found", stockUpdated);
        res.status(500).json({message:"stock not found"});
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async deletestockInPortfolio(req, res) {
    try {
      let stockDeleted = await portfolioService.deleteStock(
        req.params.id
      );
      if(stockDeleted.nModified === 1){
        console.log("stock deleted", stockDeleted);
        res.status(200).json({message:"stock deleted"});
      }else{
        res.status(500).json({message:"stock not found"});
      }   
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }
}

module.exports = PortfolioController;
