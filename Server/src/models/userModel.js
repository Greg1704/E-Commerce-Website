import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario es un campo obligatorio"],
        unique: true,
        minlength: [5, "El nombre de usuario debe tener al menos 5 caracteres"],
        maxlength: [20, "El nombre de usuario no puede tener más de 20 caracteres"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es un campo obligatorio"],
        validate:{ 
            validator: (value) => /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
            message: "La contraseña debe tener mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número"
        }
    },
})

const users = mongoose.model('users',userSchema);

export default users;
