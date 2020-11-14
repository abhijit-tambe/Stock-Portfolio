const PortfolioService = require("../service/portfolioService");
const UserServie = require("../service/userService");

const userService = new UserServie();
const portfolioService = new PortfolioService();

class userController {
  async createUser(req, res) {
    let data = req.body;
    try {
      let userExist = await userService.getUserByEmail(data.email);
      console.log("exist", userExist);
      if (!userExist) {
        let newUser = await userService.createUser(data);
        res.status(200).json(newUser);
      } else {
        // res.status(500).json({ message: "user already exist with this email" });
        throw new Error("user already exist with this email");
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  signInUser(req, res) {
    let data = req.body;
    userService
      .signInUser(data.email, data.password)
      .then((user) => {
        console.log("login", user);
        if (user)
          res.status(200).json({ messsage: "user logged in successfully" });
        else res.status(401).json({ error: "wrong credentials" });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      });
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
    let data = req.body;
    try {
      let user = await userService.getUserById(data.userId);
      if (user) {
        let updatedUser = await userService.updateUserPassword(
          data.userId,
          data.password
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
    let id = req.params.id;
    try {
      let user = await userService.getUserById(id);
      console.log("user", user);
      if (user) {
        console.log("user.portfolios", user.portfolios);
        let userPortfolios = user.portfolios;

        userPortfolios.forEach(async (portfolio) => {
          console.log("portfolio", portfolio);
          await portfolioService.deletePortfolioById(portfolio.id);
        });

        let userDeleted = await userService.deleteUser(id);
        console.log("userdel", userDeleted);
        if (userDeleted) {
          res.status(200).json({ message: "user deleted" });
        } else {
          throw new Error("error deleting user");
        }
      } else {
        res.status(404).json({ error: "user not found" });
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
