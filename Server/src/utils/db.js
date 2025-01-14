//EN ESTE ARCHIVO CONECTAREMOS LA BASE DE DATOS Y CREAREMOS DE NO EXISTIR, LAS COLECCIONES.

import mongoose from "mongoose";
import models from "../models/userModel.js";

const { users, clients, admins } = models;

export const connectDB = async (app) =>{
        const conn = await mongoose.connect('mongodb://localhost:27017/e-commerce');
}
