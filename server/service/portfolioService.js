
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

    addStock(data){
        console.log('hit');
        console.log(data);
            let portfolioId = data.portfolioId;
            let newStock = new Object();
            newStock.symbol = data.symbol;
            newStock.shares = data.shares;
            newStock.purchasePrice = data.purchasePrice;
            newStock.addedPrice =data.addedPrice; 
        return Portfolio.update({_id: portfolioId},{$push:{stocks:newStock}});
    }

    addMultiStock(data){
        console.log('hit');
        console.log(data);
        return Portfolio.updateMany({_id: data.portfolioId},{$push:{stocks:{$each:data.stock}}});
    }



    updateStock(data){
        console.log('hit',data);
        return Portfolio.update({"stocks._id":data.stockId},{$set:{"stocks.$.purchasePrice":data.purchasePrice,"stocks.$.shares":data.shares}});
        // db.portfolios.update({"stocks._id":ObjectId("5facaf52d896e6417c05db66")},{$set:{"stocks.$.purchasePrice":4000,"stocks.$.shares":50}})
    }

    deleteStock(id){
        console.log('hit')
        return Portfolio.update({"stocks._id": id},{$pull:{stocks:{_id:id}}});
        // db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})
        // db.portfolios.update({"stocks._id":ObjectId("5facaeced896e6417c05db65")},{$pull:{stocks:{_id:ObjectId("5facaeced896e6417c05db65")}}})
        
    }

}

module.exports = PortfolioService;