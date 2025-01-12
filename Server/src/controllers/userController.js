import users from "../models/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from 'bcrypt';

export const registerUser = asyncErrorHandler(async (req,res,next) =>{
    const user = await users.create(req.body);

    res.status(201).json({
        status:200,
        data:{
            user
        }
    })
})

export const loginUser = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const encoded = authHeader && authHeader.split(' ')[1];
    const decoded = atob(encoded);
    const decodedArray = decoded.split(':');
    const username = decodedArray[0]; 
    const password = decodedArray[1]; 

    const foundUser = await users.find({username: username});

    if(foundUser.length === 0){
        const error = new CustomError("The username doesn't exist",404);
        return next(error);
    }

    bcrypt.compare(password,foundUser[0].password)
    .then(isMatch =>{
        if(isMatch){
            res.status(200).json({
                status:200,
                message: "Successfull login"
            })
        }else{
            const error = new CustomError("Wrong Password",401);
            next(error);
        }
    });
})
