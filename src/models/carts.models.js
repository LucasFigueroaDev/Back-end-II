import { Schema, model } from "mongoose";

const cartsCollection = "carts";

const cartSchema = new Schema({
    products: [
        {
            _id: false,
            quantity: {
                type: Number,
                default: 0
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: "products"
            }
        }
    ]
});

export const CartModel = model(cartsCollection, cartSchema);