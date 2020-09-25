const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  res.status(200).send("hi form user");
});

router.get("/allusers", (req, res, next) => {
  let allUsers = {
    count:0,
    users:[]
  }
  User.find()
    // .select("email password")
    
    .exec()
    .then((doc) => {
      if (doc) {
        allUsers.count = doc.length;
        allUsers.users =doc;
        res.status(200).json(allUsers);
      }
    })
    .catch();
});

router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      //   console.log(user);
      if (user.length >= 1) {
        return res.status(409).json({
          message: "user already exist with this email",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "user created",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      //   console.log(user);
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      } else {
        console.log(user);
        // console.log(req.body.password);
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth Failed",
            });
          }
          if (result) {
            // jwt.sign(
            //   { userId: user[0]._id, email: user[0].email },
            //   process.env.JWT_PRIVATE_KEY,
            //   { expiresIn: "1h" },
            //   (err, token) => {
            //     if (err) {
            //       console.log(err);
            //       return res.status(500).json({
            //         error,
            //       });
            //     }
            //     if (token) {
            //       console.log(token);
            //       return res.status(200).json({
            //         token,
            //         message: "Auth Successful",
            //       });
            //     }
            //   }
            // );
            const token = jwt.sign(
              { userId: user[0]._id, email: user[0].email },
              process.env.JWT_PRIVATE_KEY,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              token,
              message: "Auth Successful",
            });
          } else {
            res.status(401).json({
              message: "Auth Failed",
            });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
});

router.delete("/:userId", (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({
          message: "user deleted succesfully",
        });
      } else {
        res.status(500).json({
          message: "user doesn't exist",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

module.exports = router;
