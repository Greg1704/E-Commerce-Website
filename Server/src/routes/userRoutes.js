import express from 'express';
import * as userMethods from '../controllers/loginController.js'

const router = express.Router();

router.use('/login',(req,res) =>{

});

router.use('/register',(req,res) =>{
    userMethods.registerUser("gregorio","pedosoo");
    res.writeHead(200);
    res.end();
});

router.use('/refresh',(req,res) =>{

});

export default router;