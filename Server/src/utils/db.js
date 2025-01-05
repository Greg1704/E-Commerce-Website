//EN ESTE ARCHIVO CONECTAREMOS LA BASE DE DATOS Y CREAREMOS DE NO EXISTIR, LAS COLECCIONES.

import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/e-commerce');

        const usersExist = 0; //COMO CHOTA VERIFICO SI EXISTE UNA COLECCIÓN EN MONGOOSE

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);  
    }
}