import express from 'express';
import * as userMethods from '../controllers/loginController.js'

const router = express.Router();

router.post('/login',(req,res) =>{

});

router.post('/register',(req,res,next) =>{
    userMethods.registerUser(req,res,next);
});

router.post('/refresh',(req,res) =>{

});

export default router;