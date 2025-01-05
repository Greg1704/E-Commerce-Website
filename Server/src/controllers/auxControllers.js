import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: 'config/.env'});
const HTTP_PORT = process.env.HTTP_PORT || 3003;

const app = express();
mongoose.connect('mongodb://localhost:27017/e-commerce');

app.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`);
    mongoose.connect('mongodb://localhost:27017/e-commerce');

    const kittySchema = new mongoose.Schema({
        name: String
    });

    const Kitten = mongoose.model('Kitten', kittySchema);
    const silence = new Kitten({ name: 'Silence' });
    silence.save();
});