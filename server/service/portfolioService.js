
const Portfolio = require('../database/models/portfolio');


class PortfolioService{
    createPortfolio(data){
        let portfolio = new Portfolio();
        portfolio.name = data.name;
        portfolio.userId = data.userId;
        portfolio.stocks = [...data.stocks];
        return portfolio.save();
    }

    deletePortfolio(data){

    }

    updatePortfolio(data){

    }

    getAllPortfolios(){
       return Portfolio.find({}).populate('userId').exec();
    }

    getPortfolio(name){
        return Portfolio.find({name:name});
    }

    getPortfolioById(id){
        return Portfolio.find({_id:id}).populate('userId').exec();
    }

    addStockToPortfolio(data){
        console.log('hit');
        console.log(data);
            let portfolioId = data.portfolioId;
            let newStock = new Object();
            newStock.symbol = data.symbol;
            newStock.shares = data.shares;
            newStock.purchasePrice = data.purchasePrice;
            newStock.addedPrice =data.addedPrice; 
            console.log('new',newStock);
            // console.log('object')
        return Portfolio.update({_id: portfolioId},{$push:{stocks:newStock}});
    }

    addMultiStockToPortfolio(data){
        console.log('hit');
        console.log(data);
        return Portfolio.updateMany({_id: data.portfolioId},{$push:{stocks:{$each:data.stock}}});
    }

    deleteStockFromPortfolio(data){
        console.log('hit')
        return Portfolio.update({_id: data.portfolioId},{$pull:{stocks:{_id:data.stockId}}});
        // db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})
    }

}

module.exports = PortfolioService;