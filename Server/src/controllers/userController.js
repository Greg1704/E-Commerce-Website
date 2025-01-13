import users from "../models/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const registerUser = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const encoded = authHeader && authHeader.split(' ')[1];
    const decoded = atob(encoded);
    const decodedArray = decoded.split(':');
    const username = decodedArray[0]; 
    const password = decodedArray[1]; 
    const user = await users.create({username, password});
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
            const accessToken = jwt.sign({ id:foundUser[0]._id },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' }); //5 min
            const refreshToken = jwt.sign({ id:foundUser[0]._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60m' });
            res.status(200).json({
                status:200,
                message: "Successfull login",
                accessToken,
                refreshToken
            })
        }else{
            const error = new CustomError("Wrong Password",401);
            return next(error);
        }
    });
})

export const refreshUser = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Separamos el token del Bearer
    if (!token){
        const error = new CustomError("Access denied, lack of token",401);
        return next(error);
    } 
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
            const error = new CustomError("Access denied, invalid token",403);
            return next(error);
        } 
        const username = req.body["username"];
        const accessToken = jwt.sign({ id:username },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' });
        res.status(200).json({
            status:200,
            message: "Successfull refresh",
            accessToken,
            refreshToken
        })
    });
})