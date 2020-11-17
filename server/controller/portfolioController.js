const PortfolioService = require("../service/portfolioService");

const portfolioService = new PortfolioService();

class PortfolioController {
  async createPortfolio(req, res) {
    const { userId } = req.userData;
    const data = req.body;
    console.log("portfolioController", data, userId);
    try {
      let portfolioExist = await portfolioService.getUserPortfolioByName(
        userId,
        data.portfolioname
      );
      if (!portfolioExist) {
        let newPortfolio = await portfolioService.createPortfolio(userId, data);
        // console.log("update user portfolio record", newPortfolio);
        if (newPortfolio) {
          res.status(200).json(newPortfolio);
        } else {
          throw new Error("error creating portfolio");
        }
      } else {
        throw new Error("portfolio name already exist");
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllUserPortfolios(req, res) {
    const { userId } = req.userData;
    console.log("all portfolios");
    try {
      let portfolios = await portfolioService.getAllPortfoliosByUserId(userId);
      if (portfolios.length >= 1) {
        res.status(200).json(portfolios);
      } else {
        res.status(404).json({ message: "no portfolios found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateNameInPortfolio(req, res) {
    try {
      const { userId } = req.userData;
      const data = req.body;
      let portfolio = await portfolioService.getPortfolioById(
        userId,
        data.portfolioId
      );
      // console.log("pf", portfolio);
      if (portfolio) {
        let portfolioNameExist = await portfolioService.getUserPortfolioByName(
          userId,
          data.portfolioname
        );
        if (!portfolioNameExist) {
          let updated = await portfolioService.updatePortfolioByName(
            portfolio._id,
            data.portfolioname
          );
          // console.log(updated);
          res
            .status(200)
            .json({ message: "portfolio name updated successfully" });
        } else {
          throw new Error("try giving a different name");
        }
      } else {
        res.status(404).json({ message: "portfolio not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }

  async deletePortfolioById(req, res) {
    const { userId } = req.userData;
    const id = req.params.id;
    try {
      let portfolio = await portfolioService.getPortfolioById(userId, id);
      // console.log("portfolio", portfolio);
      if (portfolio) {
        let portfolioDeleted = await portfolioService.deletePortfolioById(
          userId,
          id
        );
        // console.log("portfolio deleted", portfolioDeleted);
        if (portfolioDeleted) {
          res.status(200).json({ message: "portfolio deleted successfully" });
        } else {
          throw new Error("error deleting portfolio");
        }
      } else {
        res.status(404).json({ message: "portfolio not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPortfolioById(req, res) {
    try {
      const { userId } = req.userData;
      let id = req.params.id;
      let portfolio = await portfolioService.getPortfolioById(userId, id);
      if (portfolio) {
        res.status(200).json(portfolio);
      } else {
        res.status(404).json({ message: "portfolio does not exist" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addStockInPortfolio(req, res) {
    try {
      const data = req.body;
      const { userId } = req.userData;
      let portfolio = await portfolioService.getPortfolioById(
        userId,
        data.portfolioId
      );
      if (portfolio) {
        let stockExist = await portfolioService.getStockBySymbol(
          data.portfolioId,
          data.stock.symbol
        );
        console.log("stock exist");
        if (!stockExist) {
          let stockAdded = await portfolioService.addStock(
            portfolio._id,
            data.stock
          );
          if (stockAdded.nModified === 1) {
            console.log("stock added", stockAdded);
            res.status(200).json({ message: "stock added" });
          } else {
            throw new Error("error adding stock");
          }
        } else {
          throw new Error("stock already exist");
        }
      } else {
        res.status(404).json({ message: "portfolio not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async addMultiStockInPortfolio(req, res) {
    try {
      const data = req.body;
      const { userId } = req.userData;
      let portfolio = await portfolioService.getPortfolioById(
        userId,
        data.portfolioId
      );
      console.log("object", portfolio);
      if (portfolio) {
        let stocksAdded = await portfolioService.addMultiStock(
          data.portfolioId,
          data.stocks
        );
        if (stocksAdded.nModified === 1) {
          res.status(200).json({ message: "stocks added" });
        } else {
          throw new Error("error adding stocks");
        }
      } else {
        res.status(404).json({ message: "portfolio not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }

  async updatestockInPortfolio(req, res) {
    try {
      const data = req.body;
      const { userId } = req.userData;
      let stock = await portfolioService.getStockById(userId, data.stockId);
      if (stock) {
        let updateStock = await portfolioService.updateStock(userId, data);
        if (updateStock.nModified === 1) {
          res.status(200).json({ message: "stock updated successfully" });
        } else {
          throw new Error("error updating stock");
        }
      } else {
        res.status(404).json({ message: "stock not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletestockInPortfolio(req, res) {
    try {
      const stockId = req.params.id;
      const { userId } = req.userData;
      let stock = await portfolioService.getStockById(userId, stockId);
      if (stock) {
        let stockDeleted = await portfolioService.deleteStockById(stockId);
        if (stockDeleted.nModified === 1) {
          // console.log("stock deleted", stockDeleted);
          res.status(200).json({ message: "stock deleted" });
        } else {
          throw new Error("error deleting stock");
        }
      } else {
        res.status(404).json({ message: "stock not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "error occured" });
    }
  }
}

module.exports = PortfolioController;
