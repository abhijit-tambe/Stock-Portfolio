const Portfolio = require("../database/models/portfolio");

class PortfolioService {
  createPortfolio(data) {
    let portfolio = new Portfolio();
    portfolio.name = data.name;
    // portfolio.userId = data.userId;
    portfolio.stocks = data.stocks;
    return portfolio.save();
  }

  deletePortfolioById(id) {
    return Portfolio.findByIdAndDelete({ _id: id });
  }

  updatePortfolioByName(id, name) {
    return Portfolio.update({ _id: id }, { $set: { name: name } }).exec();
  }

  getAllPortfolios() {
    //    return Portfolio.find({}).populate('userId').exec();
    return Portfolio.find({}).exec();
  }

  getPortfolioByName(name) {
    return Portfolio.find({ name: name });
  }

  getPortfolioById(id) {
    // return Portfolio.find({_id:id}).populate('userId').exec();
    return Portfolio.find({ _id: id }).exec();
  }

  addStock(data) {
    console.log("hit");
    return Portfolio.update(
      { _id: data.portfolioId },
      { $push: { stocks: data.stock } }
    );
  }

  addMultiStock(data) {
    return Portfolio.updateMany(
      { _id: data.portfolioId },
      { $push: { stocks: { $each: data.stock } } }
    );
  }

  updateStock(data) {
    return Portfolio.update(
      { "stocks._id": data.stockId },
      {
        $set: {
          "stocks.$.purchasePrice": data.purchasePrice,
          "stocks.$.shares": data.shares,
        },
      }
    );
    // db.portfolios.update({"stocks._id":ObjectId("5facaf52d896e6417c05db66")},{$set:{"stocks.$.purchasePrice":4000,"stocks.$.shares":50}})
  }

  deleteStock(id) {
    console.log("hit");
    return Portfolio.update(
      { "stocks._id": id },
      { $pull: { stocks: { _id: id } } }
    );
    // db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})
    // db.portfolios.update({"stocks._id":ObjectId("5facaeced896e6417c05db65")},{$pull:{stocks:{_id:ObjectId("5facaeced896e6417c05db65")}}})
  }
}

module.exports = PortfolioService;
