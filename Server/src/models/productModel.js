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
    opinion: {
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
        }
})