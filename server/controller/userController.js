const UserServie = require("../service/userService");

const userService = new UserServie();

class userController {
  async createUser(req, res) {
    let data = req.body;
    try {
      let userExist = await userService.getUser(data.email);
      if (userExist < 1) {
        let newUser = await userService.createUser(data);
        res.status(200).json(newUser);
      } else {
        res.status(500).json({ message: "user already exist with this email" });
      }
    } catch (err) {
      res.status(501).json({ message: "error" });
    }
  }

//   updateUser(req, res) {
//     res.status(200).json({});
//   }

//   addUserPortfolio(req,res){
//     res.status(200).json({});
//   }

  deleteUserPortfolio(req,res){
    res.status(200).json({});
  }


  async deleteUser(req, res) {
    let id = req.params.id;
    try {
      let userDeleted = await userService.deleteUser(id);
      if (userDeleted) {
        res.status(200).json({ message: "user deleted" });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      res.status(501).json({ message: "error occured" });
    }
  }

  async getUser(req,res){
    try{
      let id = req.params.id;
      let user = await userService.findUserById(id);
      console.log('user',user);
      if(user){
      res.status(200).json(user);
      }else{
        res.status(501).json({ message: "error occured" });
      }

    }catch(err){
      res.status(501).json({ message: "error occured" });
    }
      
      
  }

  async getAllUsers(req, res) {
    try {
      let allUsers = {
        count: 0,
        users: [],
      };
      allUsers.users = await userService.getAllUsers();
      allUsers.count = allUsers.users.length;
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(501).json({ message: "error" });
    }
  }
}

module.exports = userController;
