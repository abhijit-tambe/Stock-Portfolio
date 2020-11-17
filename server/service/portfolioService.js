const portfolio = require("../database/models/portfolio");
const Portfolio = require("../database/models/portfolio");

class PortfolioService {
  createPortfolio(userId, data) {
    let portfolio = new Portfolio();
    portfolio.portfolioname = data.portfolioname;
    portfolio.userId = userId;
    portfolio.stocks = data.stocks;
    return portfolio.save();
  }

  deletePortfolioById(userId, id) {
    return Portfolio.findByIdAndDelete({ _id: id, userId });
  }

  updatePortfolioByName(id, portfolioname) {
    return Portfolio.update({ _id: id }, { $set: { portfolioname } }).exec();
  }

  getAllPortfoliosByUserId(userId) {
    //    return Portfolio.find({}).populate('userId').exec();
    return Portfolio.find({ userId }).exec();
  }

  // getPortfolioByName(name) {
  //   return Portfolio.find({ name: name });
  // }

  getPortfolioById(userId, id) {
    // return Portfolio.find({_id:id}).populate('userId').exec();
    return Portfolio.findById({ _id: id, userId }).exec();
  }

  addStock(id, stock) {
    console.log("hit");
    return Portfolio.update({ _id: id }, { $push: { stocks: stock } });
  }

  addMultiStock(portfolioId, stocks) {
    return Portfolio.updateMany(
      { _id: portfolioId },
      { $push: { stocks: { $each: stocks } } }
    );
  }

  updateStock(userId, data) {
    return Portfolio.update(
      { userId, "stocks._id": data.stockId },
      {
        $set: {
          "stocks.$.purchasePrice": data.purchasePrice,
          "stocks.$.shares": data.shares,
        },
      }
    );
    // db.portfolios.update({"stocks._id":ObjectId("5facaf52d896e6417c05db66")},{$set:{"stocks.$.purchasePrice":4000,"stocks.$.shares":50}})
  }

  deleteStockById(id) {
    console.log("hit");
    return Portfolio.update(
      { "stocks._id": id },
      { $pull: { stocks: { _id: id } } }
    );
    // db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})
    // db.portfolios.update({"stocks._id":ObjectId("5facaeced896e6417c05db65")},{$pull:{stocks:{_id:ObjectId("5facaeced896e6417c05db65")}}})
  }

  getStockById(userId, stockId) {
    return Portfolio.findOne({ userId, "stocks._id": stockId }).exec();
  }

  getUserPortfolioByName(userId, portfolioname) {
    return Portfolio.findOne({ userId, portfolioname }).exec();
  }

  getStockBySymbol(id, symbol) {
    return portfolio.findOne({ _id: id, "stocks.symbol": symbol }).exec();
  }
}

module.exports = PortfolioService;
