import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is a required field"],
        unique: [true, "Email already exists"],
        minlength: [11, "Email must be at least 11 characters"],
        maxlength: [35, "Email must be at most 35 characters"],
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
        validate:{ 
            validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
            message: "Password should be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and a number"
        }
    },
})

userSchema.pre('save', async function(next) {
    // Check if the password has been modified, if not, skip hashing
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt with a complexity factor of 10
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace the plain text password with the hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        // Pass any error to the next middleware
        next(error);
    }
});

const users = mongoose.model('users',userSchema);

const clients = users.discriminator('clients', new mongoose.Schema({
    full_name:{
        type: String,
        required: [true, "Full name is a required field"],
        validate:{ 
            validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]$/.test(value),
            message: "Full name should only include letters from the alphabet."
        }
    },
    cellphone:{
        type: String,
        required: [true, "Cellphone is a required field"],
        validate:{ 
            validator: (value) => /(?=.\d)(?=.[+])[\d@$!%*#?&]$/.test(value),
            message: "Cellphone should only include numbers."
        }
    },
    street_address:{
        type: String,
        required: [true, "Street address is a required field"]
    },
    city:{
        type: String,
        required: [true, "City is a required field"]
    },
    province:{
        type: String,
        required: [true, "Province/state is a required field"]
    },
    country:{
        type: String,
        required: [true, "Country is a required field"]
    },
    payment_method: new mongoose.Schema({
        number: {
            type: String,
            required: [true, "Number is a required field"],
            unique: [true, "Number already exists"],
        },
        security_code: {
            type: String,
            required: [true, "Security code is a required field"],
        },
        owner_name:{
            type: String,
            required: [true, "Owner's name is a required field"],
            validate:{ 
                validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]$/.test(value),
                message: "Owner's name should only include letters from the alphabet."
            }
        },
    })
}));

const admins = users.discriminator('admins', new mongoose.Schema({
    // Puedes agregar campos específicos para Administrador si es necesario
  }));

const models = {users, clients, admins};
export default models;