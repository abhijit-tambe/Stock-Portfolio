const Portfolio = require("../models/portfolio");

class PortfolioService {
  createPortfolio(userId, data) {
    let portfolio = new Portfolio();
    portfolio.portfolioname = data.portfolioname;
    portfolio.userId = userId;
    portfolio.stocks = data.stocks;
    return portfolio.save();
  }//r

  deletePortfolioById(userId, id) {
    return Portfolio.findByIdAndDelete({ _id: id, userId });
  } //r

  updatePortfolioByName(id, portfolioname) {
    return Portfolio.updateOne({ _id: id }, { $set: { portfolioname } }).exec();
  } //r

  getAllPortfoliosByUserId(userId) {
    //    return Portfolio.find({}).populate('userId').exec();
    return Portfolio.find({ userId }).exec();
  } //r

  getPortfolioById(userId, id) {
    console.log("object")
    // return Portfolio.find({_id:id}).populate('userId').exec();
    return Portfolio.findById({ _id: id, userId }).exec();
  } //r

  addStock(id, stock) {
    // console.log("hit");
    return Portfolio.updateOne({ _id: id }, { $push: { stocks: stock } });
  } //r

  addMultiStock(portfolioId, stocks) {
    return Portfolio.updateOne(
      { _id: portfolioId },
      { $push: { stocks: { $each: stocks } } }
    );
  } //r

  updateStock(userId, data) {
    return Portfolio.updateOne(
      { userId, "stocks._id": data.stockId },
      {
        $set: {
          "stocks.$.purchasePrice": data.purchasePrice,
          "stocks.$.shares": data.shares,
        },
      }
    );
    // db.portfolios.update({"stocks._id":ObjectId("5facaf52d896e6417c05db66")},{$set:{"stocks.$.purchasePrice":4000,"stocks.$.shares":50}})
  } //r

  deleteStockById(id) {
    return Portfolio.updateOne(
      { "stocks._id": id },
      { $pull: { stocks: { _id: id } } }
    );
    // db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})
    // db.portfolios.update({"stocks._id":ObjectId("5facaeced896e6417c05db65")},{$pull:{stocks:{_id:ObjectId("5facaeced896e6417c05db65")}}})
  } //r

  getStockById(userId, stockId) {
    return Portfolio.findOne({ userId, "stocks._id": stockId }).exec();
  } //r

  getUserPortfolioByName(userId, portfolioname) {
    return Portfolio.findOne({ userId, portfolioname }).exec();
  } //r

  getStockBySymbol(id, symbol) {
    return Portfolio.findOne({ _id: id, "stocks.symbol": symbol }).exec();
  } //r

  deleteAllPortfoliosByUserId(userId){
    return Portfolio.deleteMany({userId});
  }//r

}

module.exports = PortfolioService;
