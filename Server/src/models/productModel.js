import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"],
        minlength: [10, "Name must be at least 11 characters"],
        maxlength: [60, "Name must be at most 35 characters"],
    },
    description:{
        type: String,
        required: [false],
        minlength: [30, "Description must be at least 11 characters"],
        maxlength: [300, "Description must be at most 35 characters"],
    },
    review: {
            type: [
                new mongoose.Schema({
                    Title: {
                        type: String,
                        required: [false],
                        maxlength: [30, "Title must be at most 30 characters"],
                    },
                    description:{
                        type: String,
                        required: [false],
                        minlength: [30, "Description must be at least 11 characters"],
                        maxlength: [300, "Description must be at most 35 characters"],
                    },
                })
            ],
            required: false,
            default: []
    },
    picture: {
            type: [
                new mongoose.Schema({
                    fileName: {
                      type: String,
                      required: true,
                    },
                    file: {
                      data: Buffer,
                      contentType: String,
                    },
                    uploadTime: {
                      type: Date,
                      default: Date.now,
                    },
                  })
            ],
            required: false,
            default: []
    }
})

const products = mongoose.model('products',productSchema);

export default products;