import express from 'express';
import * as userMethods from '../controllers/userController.js';

const router = express.Router();

router.post('/login',(req,res,next) =>{
    userMethods.loginUser(req,res,next)

});

router.post('/register',(req,res,next) =>{
    userMethods.registerUser(req,res,next);
});

router.post('/refresh',(req,res) =>{

});

export default router;