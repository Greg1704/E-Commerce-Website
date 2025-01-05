import express from 'express';
import mongoose from 'mongoose';
import * as userMethods from '../controllers/loginController.js'

const router = express.Router();

router.use('/login',(req,res) =>{

});

router.use('/register',(req,res) =>{
    const userSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    const users = mongoose.model('Users',userSchema);
    const newUsername = new users({
        username: "grefo",
        password: "kikoju"
    })
    newUsername.save();
    res.writeHead(200);
    res.end();
});

router.use('/refresh',(req,res) =>{

});

export default router;