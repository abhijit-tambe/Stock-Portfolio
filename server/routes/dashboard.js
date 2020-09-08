const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/jwtAuth");
const User = require("../models/user");

router.get("/", checkAuth, (req, res, next) => {
  const userData = req.userData;
  console.log(userData);
  User.find({ _id: userData.userId })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(200).json({
          message: `welcome ${user[0].email}`,
        });
      } else {
        res.status(500).json({
          message: "user doesn't exist",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error,
      });
    });
});

module.exports = router;
