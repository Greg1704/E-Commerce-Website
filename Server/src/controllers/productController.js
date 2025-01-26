import products from "../models/productModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";

export const getAllProducts = asyncErrorHandler(async (req,res,next) => {

})

export const getProduct = asyncErrorHandler(async (req,res,next) => {
    const id = req.url.split('/')[2];
    const product = await products.findById(id);

    if(!product){
        const error = new CustomError("Product couldn't be found on the database",404);
        return next(error);
    }

    res.status(200).json({
        data:{
            product
        }
    })
})

export const postProduct = asyncErrorHandler(async (req,res,next) => {
    const {name,description,review: review,picture} = req.body;

    const productData = { name, description };

    if (review) productData.review = review;
    if (picture) productData.picture = picture;

    const product = await products.create(productData);

    res.status(200).json({
        data:{
            product
        }
    })
})

export const deleteProduct = asyncErrorHandler(async (req,res,next) => {
    const id = req.url.split('/')[2];
    const product = await products.findById(id);
    const deleted = await products.deleteOne({_id:id})

    if(!deleted){
        const error = new CustomError("Product couldn't be found on the database",404);
        return next(error);
    }

    res.status(200).json({
        message:"Successfully eliminated."
    })
})

export const getReview = asyncErrorHandler(async (req,res,next) =>{
    const id = req.url.split('/')[2];

    const product = await products.findById(id);

    if(!product){
        const error = new CustomError("The product doesn't exist",404);
        return next(error);
    }

    if(!product.review){
        const error = new CustomError("There aren't any reviews linked to this product",200); //I mean, its not a mistake technically xd
        return next(error);
    }

    res.status(200).json(
        product.review
    )
})

export const postReview = asyncErrorHandler(async (req,res,next) =>{
    const id = req.url.split('/')[2];
    const newReview = req.body;

    const product = await products.findById(id);

    if(!product){
        const error = new CustomError("The product doesn't exist",404);
        return next(error);
    }

    product.review.push(newReview);
    await product.save({ validateModifiedOnly: true });

    res.status(200).json({
        message:"Review successfully sumbitted",
        newReview
    })
})

export const getPicture = asyncErrorHandler(async (req,res,next) => {

})

export const postPicture = asyncErrorHandler(async (req,res,next) => {
    
})

export const deletePicture = asyncErrorHandler(async (req,res,next) => {
    
})