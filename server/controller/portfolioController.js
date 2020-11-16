const PortfolioService = require("../service/portfolioService");
const UserService = require("../service/userService");
const util = require("util");

const portfolioService = new PortfolioService();
const userService = new UserService();

class PortfolioController {
  async createPortfolio(req, res) {
    let data = req.body;
    console.log("portfolioController", data);
    try {
      let portfolioExist = await userService.getUserPortfolioByName(
        data.userId,
        data.name
      );
      // console.log("pE", util.inspect(portfolioExist, false, 3, true));
      if (!portfolioExist) {
        let newPortfolio = await portfolioService.createPortfolio(data);
        let updateUserPortfolioRecord = await userService.addUserPortfolio(
          data.userId,
          newPortfolio._id,
          newPortfolio.name
        );
        console.log("update user portfolio record", updateUserPortfolioRecord);
        if (updateUserPortfolioRecord) {
          res.status(200).json(newPortfolio);
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

  async deletePortfolioById(req, res) {
    console.log(req.params.id, req.params.pid);
    console.log("controller hit");
    let id = req.params.pid;
    try {
      let portfolio = await portfolioService.getPortfolioById(id);
      console.log("portfolio", portfolio);
      let portfolioDeleted = await portfolioService.deletePortfolioById(id);
      console.log("portfolio deleted", portfolioDeleted);
      // let deleteUserPortfolioRecord = await userService.deleteUserPortfolio(
      //   portfolio[0].userId,
      //   id
      // );
      let deleteUserPortfolioRecord = await userService.deleteUserPortfolio(
        req.params.id,
        id
      );

      console.log("deleted user porfolio reacord", deleteUserPortfolioRecord);
      if (deleteUserPortfolioRecord.nModified === 1) {
        res.status(200).json({ message: "portfolio deleted" });
      } else {
        res.status(500).json({ message: "error occured" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async updateNameInPortfolio(req, res, next) {
    let data = req.body;
    try {
      // get data from portfolio by id and check if the new name === name
      let portfolio = await portfolioService.getPortfolioById(data.portfolioId);
      // console.log('portfolio',data.newName,portfolio[0].name);
      if (data.newName !== portfolio[0].name) {
        let portfolioConfictName = await portfolioService.getPortfolioByName(
          data.newName
        );
        console.log(portfolioConfictName.length);
        if (portfolioConfictName.length < 1) {
          let updatedName = await portfolioService.updatePortfolioByName(
            data.portfolioId,
            data.newName
          );
          console.log("updatedName", updatedName);
          if (updatedName.nModified === 1) {
            await userService.updateUserPortfolioName(
              data.userId,
              data.portfolioId,
              data.newName
            );
            res.status(200).json({ message: "portfolio name update" });
          } else {
            // res.status(500).json({ message: "error 1" });
            throw new Error("name not updated");
          }
        } else {
          // res.status(500).json({ message: "portfolio with this name exist" });
          throw new Error("portfolio with this name already exist");
        }
      } else {
        // res.status(500).json({ message: "same name" });
        throw new Error("please try again with a diffrent name");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getPortfolioById(req, res) {
    try {
      let id = req.params.id;
      let portfolio = await portfolioService.getPortfolioById(id);
      if (portfolio.length === 1) {
        res.status(200).json(portfolio);
      } else {
        res.status(500).json({ message: "portfolio does not exist" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async getAllPortfolios(req, res) {
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
      if (stockAdded.nModified === 1) {
        console.log("stock added", stockAdded);
        res.status(200).json({ message: "stock added" });
      } else {
        res.status(500).json({ message: "error adding stock" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async addMultiStockInPortfolio(req, res) {
    try {
      let stocksAdded = await portfolioService.addMultiStock(req.body);
      if (stocksAdded.nModified === 1) {
        res.status(200).json({ message: "stocks added" });
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
      if (stockUpdated.nModified === 1) {
        console.log("stock updated", stockUpdated);
        res.status(200).json({ message: "stock updated" });
      } else {
        console.log("stock not found", stockUpdated);
        res.status(500).json({ message: "stock not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async deletestockInPortfolio(req, res) {
    try {
      let stockDeleted = await portfolioService.deleteStock(req.params.id);
      if (stockDeleted.nModified === 1) {
        console.log("stock deleted", stockDeleted);
        res.status(200).json({ message: "stock deleted" });
      } else {
        res.status(500).json({ message: "stock not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }
}

module.exports = PortfolioController;
