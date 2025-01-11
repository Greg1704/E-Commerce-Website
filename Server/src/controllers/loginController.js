import users from "../models/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

export const registerUser = asyncErrorHandler( async (req,res,next) =>{
    const user = await users.create(req.body);

    res.status(201).json({
        status:200,
        data:{
            user
        }
    })
})
