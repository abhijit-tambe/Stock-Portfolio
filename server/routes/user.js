const express = require("express");
const router = express.Router();
const auth = require('../middleware/jwtAuth');
const UserController = require('../controller/userController');

let userController = new UserController(); 

router.post('/sign-up',(req,res)=>userController.singUpUser(req,res));// r & d
router.post('/sign-in',(req,res)=>userController.signInUser(req,res));//r & d
router.patch('/update',auth,(req,res)=> userController.updateUserPassword(req,res));// r & d
router.delete('/delete',auth,(req,res)=>userController.deleteUser(req,res));// r & d

/** optional **/
router.get('/all',(req,res)=>userController.getAllUsers(req,res));// 
router.get('/:id',(req,res)=>userController.getUserById(req,res));// 

module.exports =router;