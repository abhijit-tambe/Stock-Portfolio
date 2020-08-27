const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const db = "mongodb://localhost:27017/stocktest1";

mongoose.connect(db, (err) => {
  if (err) {
    console.log(`Error connecting to Database ${err}`);
  } else {
    console.log("connected to MongoDB");
  }
});

router.get("/", (req, res) => {
  res.send("api");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  console.log(userData);
  user.save((err, registerdUser) => {
    if (err) {
      console.log(`Error saving user into Database ${err}`);
    } else {
      res.status(200).send(registerdUser);
      console.log(`successfull inserted ${registerdUser}`);
    }
  });
});

router.get("/allusers", (req, res) => {
  // let users;
  User.find((err, data) => {
    if (err) {
      console.log(`Error retriving all users data from Database ${err}`);
    } else {
      // console.log(data);
      users = data;
      res.status(200).json(data);
    }
  });
});

module.exports = router;
