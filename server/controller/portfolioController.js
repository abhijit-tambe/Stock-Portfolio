const PortfolioService = require('../service/portfolioService');
const UserService = require('../service/userService');

const portfolioService = new PortfolioService();
const userService = new UserService();

class PortfolioController {

    async createPortfolio(req,res){
        let data = req.body;
        console.log('portfolioController',data);
        try{
            let portfolioExist = await portfolioService.getPortfolio(data.name);
            if(portfolioExist<1){
            let newPortfolio = await portfolioService.createPortfolio(data);
            // console.log('pCnewPortfolio',newPortfolio);
            let updateUserPortfolio = await userService.addUserPortfolio(data.userId,newPortfolio._id);
            // console.log('pcpcpcpcppcpccpcpcpcp');
            // console.log('pCupdatedUserPortfolio',updateUserPortfolio);
            if(updateUserPortfolio){
                res.status(200).json(updateUserPortfolio);
            }else{
                res.status(500).json({message:"error occured1"});    
            }}else{
                res.status(500).json({message:"portfolio name already exist"}); 
            }
            
        }catch(err){
            res.status(500).json({message:"error occured"});
        }
    }

    deletePortfolio(req,res){

    }

    updatePortfolio(req,res){

    }

    async getAllPortfolio(req,res){
        console.log('all portfolios')
        try{
            let portfolios = await portfolioService.getAllPortfolios();
            res.status(200).json(portfolios);
        }catch(err){
            res.status(500).json({message:"error occured"});
        }
    }


}

module.exports= PortfolioController;