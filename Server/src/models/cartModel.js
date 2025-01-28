import mongoose, { SchemaType } from "mongoose";

const cartSchema = new mongoose.Schema({
    clientId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: [true, "ClientId is a required field"]
    },
    products:{
        type: [
            new mongoose.Schema({
                productId:{
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'Products',
                    required: [true, "ProductId is a required field"]
                },
                ammount:{
                    type: Number,
                    required: [true, "Product ammount is a required field"]
                }
            })
        ],
        required: false,
        default: []
    }
});

const carts = mongoose.model('carts',cartSchema);

export default carts;