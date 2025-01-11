//EN ESTE ARCHIVO CONECTAREMOS LA BASE DE DATOS Y CREAREMOS DE NO EXISTIR, LAS COLECCIONES.

import mongoose from "mongoose";
import users from "../models/userModel.js";

export const connectDB = async (app) =>{
        const conn = await mongoose.connect('mongodb://localhost:27017/e-commerce');
}
