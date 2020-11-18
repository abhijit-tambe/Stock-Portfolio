const User = require("../models/user");

class UserService {
  createUser(email, username, hash) {
    let user = new User({ email, username, password: hash });
    return user.save();
  } //r

  getUserById(id) {
    // return User.findById({ _id: id }).select({"password":0, "__v":0}).exec();
    return User.findById({ _id: id }).select({ __v: 0 }).exec();
  } //r

  getUserByEmail(email) {
    return User.findOne({ email });
  } //r

  updateUserPassword(id, password) {
    return User.updateOne({ _id: id }, { $set: { password } });
  } //r

  deleteUserById(id) {
    return User.findByIdAndDelete({ _id: id });
  } //r

  getAllUsers() {
    // return User.find({}).populate('portfolios').exec();
    return User.find({}).exec();
  } //r

  // signInUser(email, password) {
  //   return User.findOne({ email, password }).exec();
  // }

  // addUserPortfolio(userId, id, name) {
  //   console.log("adduser service");
  //   return User.update(
  //     { _id: userId },
  //     { $push: { portfolios: { id, name } } },
  //     { upsert: true }
  //   );
  //   // db.users.update({_id:ObjectId("5fad7a6bc7c770463865a5e0")},{$push:{portfolios:{"portfolioName":"ame"}}})
  // }

  // getUserPortfolioByName(userId, name) {
  //   return User.findOne({ _id: userId, "portfolios.name": name }).exec();
  //   // > db.users.find({ _id:ObjectId("5fad7a6fc7c770463865a5e1"),"portfolios.portfolioName":"ame"}).
  // }

  // updateUserPortfolioName(userId, portfolioId, name) {
  //   return User.update(
  //     { _id: userId, "portfolios.id": portfolioId },
  //     { $set: { "portfolios.$.name": name } }
  //   );
  //   // > db.users.update({_id:ObjectId("5fadb68610e3ff51e05dc063"),"portfolios.id":"5fadb69710e3ff51e05dc065"},{$set:{"portfolios.$.name":"yae"}})
  // }
  // deleteUserPortfolio(userId, portfolioId) {
  //   return User.update(
  //     { _id: userId },
  //     { $pull: { portfolios: { id: portfolioId } } }
  //   );
  // }
}

module.exports = UserService;
