const express = require("express");
const router = express.Router();
// const User = require("../database/models/user");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const UserController = require('../controller/userController');

let userController = new UserController(); 

router.get('/all',(req,res)=>userController.getAllUsers(req,res));//working
router.post('/register',(req,res)=>userController.createUser(req,res));//working
router.get('/signin',(req,res)=>userController.deleteUser(req,res));
router.get('/update/:id',(req,res)=>userController.deleteUser(req,res));
router.delete('/delete/:id',(req,res)=>userController.deleteUser(req,res));//working

module.exports =router;