import products from "../models/productModel.js";
import carts from "../models/cartModel.js";
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

export const getCart = asyncErrorHandler(async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const clientId = payload.split('"')[3];

    const cart = await carts.findOne({clientId});

    if(!cart){
        const error = new CustomError("The cart couldn't be found",404);
        return next(error);
    }

    res.status(200).json({
        message:"Cart successfully retrieved",
        cart
    })
})

export const addProductToCart = asyncErrorHandler(async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const clientId = payload.split('"')[3];
    const productId = req.url.split('/')[2];
    const {ammount} = req.body;

    const product = await products.findById(productId);

    if(!product){
        const error = new CustomError("The product couldn't be found",404);
        return next(error);
    }

    const cart = await carts.findOne({clientId});

    if(!cart){
        const error = new CustomError("The cart couldn't be found",404);
        return next(error);
    }

    cart.products.push({productId,ammount});
    await cart.save({ validateModifiedOnly: true });

    res.status(200).json({
        message:"The product was added to the cart",
        cart
    })

})

export const patchProductToCart = asyncErrorHandler(async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const clientId = payload.split('"')[3];
    const productId = req.url.split('/')[2];
    const {ammount} = req.body;

    const product = await products.findById(productId);

    if(!product){
        const error = new CustomError("The product couldn't be found",404);
        return next(error);
    }

    const cart = await carts.findOne({clientId});

    if(!cart){
        const error = new CustomError("The cart couldn't be found",404);
        return next(error);
    }

    const productIndex = cart.products.findIndex((p) => p.productId == productId);

    if (productIndex === -1) {
        const error = new CustomError("The product couldn't be found in the cart", 404);
        return next(error);
    }
    
    cart.products[productIndex].ammount = ammount;
    await cart.save({ validateModifiedOnly: true });

    res.status(200).json({
        message:"The product ammount was modified",
        cart
    })

})

export const deleteProductOfCart = asyncErrorHandler(async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const codedPayload = token.split('.')[1];
    const payload = atob(codedPayload);
    const clientId = payload.split('"')[3];
    const productId = req.url.split('/')[2];

    const product = await products.findById(productId);

    if(!product){
        const error = new CustomError("The product couldn't be found",404);
        return next(error);
    }

    const cart = await carts.findOne({clientId});

    if(!cart){
        const error = new CustomError("The cart couldn't be found",404);
        return next(error);
    }

    const productIndex = cart.products.findIndex((p) => p.productId == productId);

    if (productIndex === -1) {
        const error = new CustomError("The product couldn't be found in the cart", 404);
        return next(error);
    }
    
    cart.products.splice(productIndex, 1);
    await cart.save({ validateModifiedOnly: true });

    res.status(200).json({
        message:"The product was removed from the cart",
        cart
    })

})