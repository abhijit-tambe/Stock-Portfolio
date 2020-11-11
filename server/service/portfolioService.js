
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
       return Portfolio.find({}).populate('userId','stocks').exec();
    }

    getPortfolio(name){
        return Portfolio.find({name:name});
    }

}

module.exports = PortfolioService;