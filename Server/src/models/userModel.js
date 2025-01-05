import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const users = mongoose.model('Users',userSchema);

export default userModel;