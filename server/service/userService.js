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
        return User.find({_id:id}).populate('portfolios').exec();
    }

    addUserPortfolio(userId,portfolioId){
        console.log('adduser service')
      return User.findOneAndUpdate({_id:userId},{$push:{portfolios:portfolioId}},{upsert:true});
       
    }

    deleteUserPortfolio(userId,portfolioId){
      return User.findOneAndUpdate({_id:userId},{$pull:{portfolios:portfolioId}});
    }



    deleteUser(id){
      return User.findByIdAndDelete({_id:id});
    }

    getUser(email){
    return User.findOne({email});
    }

    getAllUsers(){
    return User.find({}).populate('portfolios').exec(); 
    }


}

module.exports = UserService;



// db.portfolio.update({_id: ObjectId("5fac251c8f120e5af8d89310")},{$pull:{stocks:{_id:ObjectId("5fac251c8f120e5af8d89311")}}})
// db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})