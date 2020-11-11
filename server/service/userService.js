const User = require('../database/models/user');

class UserService {

     createUser(data){
        let user = new User({email:data.email,password:data.password});
        return user.save();
    }

    updateUser(data){
        
    }

    findUserById(id){
        return User.find({_id:id});
    }

    addUserPortfolio(userId,portfolioId){
        console.log('adduser service')
      return User.findOneAndUpdate({_id:userId},{$push:{portfolios:portfolioId}});
       
    }

    deleteUserPortfolio(userId,portfolioId){

    }



    deleteUser(id){
      return User.findByIdAndDelete({_id:id});
    }

    getUser(email){
    return User.findOne({email});
    }

    getAllUsers(){
    return User.find().exec();  
    }


}

module.exports = UserService;