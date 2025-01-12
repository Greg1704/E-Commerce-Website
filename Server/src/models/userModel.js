import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario es un campo obligatorio"],
        unique: [true, "El nombre de usuario ya existe"],
        minlength: [5, "El nombre de usuario debe tener al menos 5 caracteres"],
        maxlength: [20, "El nombre de usuario no puede tener más de 20 caracteres"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es un campo obligatorio"],
        validate:{ 
            validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
            message: "La contraseña debe tener mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número"
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

export default users;
