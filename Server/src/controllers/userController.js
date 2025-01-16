import models from "../models/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const { users, clients, admins } = models;

export const registerUser = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const encoded = authHeader && authHeader.split(' ')[1];
    const decoded = atob(encoded);
    const decodedArray = decoded.split(':');
    const email = decodedArray[0]; 
    const password = decodedArray[1]; 
    const {full_name, cellphone, street_address, city, province, country,payment_method} = req.body;
    const user = await clients.create({email, password,full_name, cellphone, street_address, city, province, country,payment_method});
    res.status(201).json({
        data:{
            user
        }
    })
});

export const loginUser = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const encoded = authHeader && authHeader.split(' ')[1];
    const decoded = atob(encoded);
    const decodedArray = decoded.split(':');
    const email = decodedArray[0]; 
    const password = decodedArray[1]; 

    const foundUser = await users.find({email: email});

    if(foundUser.length === 0){
        const error = new CustomError("The email wasn't found",404);
        return next(error);
    }

    bcrypt.compare(password,foundUser[0].password)
    .then(isMatch =>{
        if(isMatch){
            const accessToken = jwt.sign({ id:foundUser[0]._id},process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '150m' }); //5 min
            const refreshToken = jwt.sign({ id:foundUser[0]._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60m' });
            res.status(200).json({
                message: "Successfull login",
                accessToken,
                refreshToken
            })
        }else{
            const error = new CustomError("Wrong Password",401);
            return next(error);
        }
    });
});

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
        const id = req.body["_id"];
        const accessToken = jwt.sign({ id:id },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' });
        res.status(200).json({
            message: "Successfull refresh",
            accessToken,
            refreshToken
        })
    });
});