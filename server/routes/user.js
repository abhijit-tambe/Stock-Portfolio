const express = require("express");
const router = express.Router();
// const User = require("../database/models/user");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const UserController = require('../controller/userController');

let userController = new UserController(); 

router.post('/register',(req,res)=>userController.createUser(req,res));//required && done
router.post('/signin',(req,res)=>userController.signInUser(req,res));//required && done
router.patch('/update',(req,res)=>userController.updateUserPassword(req,res));//required && done
router.delete('/delete/:id',(req,res)=>userController.deleteUser(req,res));//required && done
router.get('/all',(req,res)=>userController.getAllUsers(req,res));//
router.get('/:id',(req,res)=>userController.getUserById(req,res));// required && done

module.exports =router;