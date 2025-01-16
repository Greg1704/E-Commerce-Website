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
    const {oldPassword,newPassword} = req.body;

    const foundUser = await users.findById(id);

    if(!foundUser){
        const error = new CustomError("The user doesn't exist",404);
        return next(error);
    }

    await bcrypt.compare(oldPassword,foundUser.password)
    .then(isMatch =>{
        if(!isMatch){
            const error = new CustomError("The old password doesn't match yours",400);
            return next(error);
        }
        foundUser.password = newPassword;
        foundUser.save();
        res.status(200).json({
            message: "Password has been changed"
        });
    })
});

export const getPaymentMethods = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const id = payload.split('"')[3]; 

    const foundUser = await users.findById(id);

    if(!foundUser){
        const error = new CustomError("The user doesn't exist",404);
        return next(error);
    }

    if(!foundUser.payment_method){
        const error = new CustomError("There aren't any payment methods linked to this account",200); //I mean, its not a mistake technically xd
        return next(error);
    }

    res.status(200).json(
        foundUser.payment_method
    )
})

export const postPaymentMethod = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const id = payload.split('"')[3];
    const newPaymentMethod = req.body;

    const foundUser = await users.findById(id);

    if(!foundUser){
        const error = new CustomError("The user doesn't exist",404);
        return next(error);
    }

    foundUser.payment_method.push(newPaymentMethod);
    await foundUser.save({ validateModifiedOnly: true });

    res.status(200).json({
        message:"Payment method successfully added",
        newPaymentMethod
    })
})

export const deletePaymentMethod = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const id = payload.split('"')[3];
    const {number} = req.body;
    console.log(number)
    const foundUser = await users.findById(id);

    if(!foundUser){
        const error = new CustomError("The user doesn't exist",404);
        return next(error);
    }

    const foundPM = foundUser.payment_method.findIndex((pm) => pm.number === number);

    if (foundPM === -1) {
        const error = new CustomError("The payment method doesn't exist", 404);
        return next(error);
    }

    // Elimina el método de pago usando el índice
    foundUser.payment_method.splice(foundPM, 1);
    await foundUser.save({ validateModifiedOnly: true });

    res.status(200).json({
        message:"Your payment method has been successfully removed"
    })
})