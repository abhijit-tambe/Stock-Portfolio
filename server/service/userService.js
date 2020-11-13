const { db } = require('../database/models/user');
const User = require('../database/models/user');

class UserService {

     createUser(data){
        let user = new User({email:data.email,password:data.password});
        return user.save();
    }

    updateUser(data){
        
    }

    findUserById(id){
        // return User.find({_id:id}).populate('portfolios').exec();
        return User.find({_id:id}).exec();
    }


    findUserPortfolioByName(userId,name){
        return User.find({_id:userId,"portfolios.name":name}).exec();
        // > db.users.find({ _id:ObjectId("5fad7a6fc7c770463865a5e1"),"portfolios.portfolioName":"ame"}).
    }

    addUserPortfolio(userId,id,name){
        console.log('adduser service')
      return User.update({_id:userId},{$push:{portfolios:{id,name}}},{upsert:true});
      // db.users.update({_id:ObjectId("5fad7a6bc7c770463865a5e0")},{$push:{portfolios:{"portfolioName":"ame"}}})
       
    }

    deleteUserPortfolio(userId,portfolioId){
      return User.update({_id:userId},{$pull:{portfolios:{id:portfolioId}}});
    }


    updateUserPortfolio(userId,portfolioId,name){
      return User.update({_id:userId,"portfolios.id":portfolioId},{$set:{"portfolios.$.name":name}});
      // > db.users.update({_id:ObjectId("5fadb68610e3ff51e05dc063"),"portfolios.id":"5fadb69710e3ff51e05dc065"},{$set:{"portfolios.$.name":"yae"}})
    }


    deleteUser(id){
      return User.findByIdAndDelete({_id:id});
    }

    getUser(email){
    return User.findOne({email});
    }

    getAllUsers(){
    // return User.find({}).populate('portfolios').exec(); 
    return User.find({}).exec(); 
    }



}

module.exports = UserService;



// db.portfolio.update({_id: ObjectId("5fac251c8f120e5af8d89310")},{$pull:{stocks:{_id:ObjectId("5fac251c8f120e5af8d89311")}}})
// db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})