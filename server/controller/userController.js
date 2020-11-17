const PortfolioService = require("../service/portfolioService");
const UserServie = require("../service/userService");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userService = new UserServie();
const portfolioService = new PortfolioService();

class userController {
  async singUpUser(req, res) {
    const data = req.body;
    try {
      let userExist = await userService.getUserByEmail(data.email);
      console.log("exist", userExist);
      if (!userExist) {
        let passwordHash = bcrypt.hashSync(data.password, saltRounds);
        let newUser = await userService.createUser(
          data.email,
          data.username,
          passwordHash
        );
        res.status(201).json(newUser);
      } else {
        res.status(500).json({ message: "user already exist with this email" });
        throw new Error("user already exist with this email");
      }
    } catch (err) {
      console.log(" error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async signInUser(req, res) {
    const data = req.body;
    try {
      let user = await userService.getUserByEmail(data.email);
      if (user) {
        console.log(user);
        let isMatch = await bcrypt.compare(data.password, user.password);
        // console.log(isMatch);
        if (isMatch === true) {
          let token = await jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            userId: user._id,
            username: user.username,
            token,
            message: "user signed in successfully",
          });
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        res.status(404).json({ error: "user not found" });
      }
    } catch (err) {
      console.log("error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      let id = req.params.id;
      let user = await userService.getUserById(id);
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not fount" });
      }
    } catch (err) {
      res.status(501).json({ error: err.message });
    }
  }

  async updateUserPassword(req, res) {
    const data = req.body;
    const { userId } = req.userData;
    try {
      let user = await userService.getUserById(userId);
      if (user) {
        const passwordHash = bcrypt.hashSync(data.password, saltRounds);
        let updatedUser = await userService.updateUserPassword(
          userId,
          passwordHash
        );
        if (updatedUser.nModified === 1) {
          res.status(200).json({ message: "user password updated" });
        } else {
          throw new Error("failed to update user password");
        }
      } else {
        res.status(404).json({ error: "user not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.userData;
    const data = req.body;
    try {
      // let user = await userService.getUserById(userId);
      // console.log("user", user);
      // if (user) {
      //   console.log("user.portfolios", user.portfolios);
      //   let userPortfolios = user.portfolios;

      //   userPortfolios.forEach(async (portfolio) => {
      //     console.log("portfolio", portfolio);
      //     await portfolioService.deletePortfolioById(portfolio.id);
      //   });

      //   let userDeleted = await userService.deleteUserById(id);
      //   console.log("userdel", userDeleted);
      //   if (userDeleted) {
      //     res.status(200).json({ message: "user deleted" });
      //   } else {
      //     throw new Error("error deleting user");
      //   }
      // } else {
      //   res.status(404).json({ error: "user not found" });
      // }
      const user = await userService.getUserById(userId);
      console.log('object',user);
      if(user){
          let isMatch = bcrypt.compareSync(data.password,user.password);
          if(isMatch){
            const allUserPortfolios = await portfolioService.getAllPortfoliosByUserId(userId);
            console.log(allUserPortfolios.length);
            allUserPortfolios.forEach( async curPortfolio=>{
              await portfolioService.deletePortfolioById(userId,curPortfolio._id);
              // console.log(curPortfolio._id);
            })
            const deleteUser = await userService.deleteUserById(userId);
            console.log('del',deleteUser);
            if(deleteUser){
              res.status(200).json({message:"user deleted successfully"})
            }else{
              throw new Error("error deleting user");
            }
          
            
          }else{
            throw new Error("invalid credentials");
          }
          
      }else{
        res.status(404).json({message:"user not found"})
      }

    } catch (err) {
      res.status(500).json({ error: err.message });
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
