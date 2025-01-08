//EN ESTE ARCHIVO CONECTAREMOS LA BASE DE DATOS Y CREAREMOS DE NO EXISTIR, LAS COLECCIONES.

import mongoose from "mongoose";
import users from "../models/userModel.js";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/e-commerce');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  
    }
}
