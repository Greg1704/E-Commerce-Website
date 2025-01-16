import models from "../models/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import bcrypt from 'bcrypt';

const { users, clients, admins } = models;

export const getPersonalData = asyncErrorHandler(async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const id = payload.split('"')[3];

    const foundId = await users.find({_id: id});
    if(foundId.length === 0){
        const error = new CustomError("Personal data couldn't be retrieved",400);
        return next(error);
    }

    const foundUser = foundId[0]._doc;
    delete foundUser.password;
    delete foundUser.payment_method;

    //Faltaria ver como sacar los metodos de pago de aca, porque medio peligroso jaja

    res.status(200).json(foundUser);
});


export const patchPersonalData = asyncErrorHandler(async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const id = payload.split('"')[3];

    console.log(req.body);

    if(req.body.password || req.body.payment_method){
        const error = new CustomError("How the hell did we reach this point",500);
        return next(error);
    }else{

        const foundUser = await users.findById(id);

        await foundUser.updateOne(req.body);

        res.status(200).json({
            message: "Your changes have been applied"
        });
    }
});

export const patchPassword = asyncErrorHandler(async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const id = payload.split('"')[3]; 
    const newPassword = JSON.stringify(req.body);

    const foundUser = await users.findById(id);

    if(!foundUser){
        const error = new CustomError("The user doesn't exist",404);
        return next(error);
    }
    foundUser.password = newPassword.split(":")[1].slice(1,-2);
    await foundUser.save();
    res.status(200).json({
        message: "Password has been changed"
    });
});