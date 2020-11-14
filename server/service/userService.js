const User = require("../database/models/user");

class UserService {
  createUser(data) {
    let user = new User({ email: data.email, password: data.password });
    return user.save();
  }

  getUserById(id) {
    // return User.findById({ _id: id }).select({"password":0, "__v":0}).exec();
    return User.findById({ _id: id }).select({ __v: 0 }).exec();
  }

  getUserByEmail(email) {
    return User.findOne({ email });
  }

  signInUser(email, password) {
    return User.findOne({ email, password }).exec();
  }

  updateUserPassword(id, password) {
    return User.updateOne({ _id: id }, { $set: { password } });
  }

  deleteUser(id) {
    return User.findByIdAndDelete({ _id: id });
  }

  getAllUsers() {
    // return User.find({}).populate('portfolios').exec();
    return User.find({}).exec();
  }

  addUserPortfolio(userId, id, name) {
    console.log("adduser service");
    return User.update(
      { _id: userId },
      { $push: { portfolios: { id, name } } },
      { upsert: true }
    );
    // db.users.update({_id:ObjectId("5fad7a6bc7c770463865a5e0")},{$push:{portfolios:{"portfolioName":"ame"}}})
  }

  getUserPortfolioByName(userId, name) {
    return User.findOne({ _id: userId, "portfolios.name": name }).exec();
    // > db.users.find({ _id:ObjectId("5fad7a6fc7c770463865a5e1"),"portfolios.portfolioName":"ame"}).
  }

  updateUserPortfolioName(userId, portfolioId, name) {
    return User.update(
      { _id: userId, "portfolios.id": portfolioId },
      { $set: { "portfolios.$.name": name } }
    );
    // > db.users.update({_id:ObjectId("5fadb68610e3ff51e05dc063"),"portfolios.id":"5fadb69710e3ff51e05dc065"},{$set:{"portfolios.$.name":"yae"}})
  }
  deleteUserPortfolio(userId, portfolioId) {
    return User.update(
      { _id: userId },
      { $pull: { portfolios: { id: portfolioId } } }
    );
  }
}

module.exports = UserService;

// db.portfolio.update({_id: ObjectId("5fac251c8f120e5af8d89310")},{$pull:{stocks:{_id:ObjectId("5fac251c8f120e5af8d89311")}}})
// db.portfolios.update({_id: ObjectId("5fac6c193d599876b44eb28e")},{$pull:{stocks:{_id:ObjectId("5fac6c193d599876b44eb28f")}}})
