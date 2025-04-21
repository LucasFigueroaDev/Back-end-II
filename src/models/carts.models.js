import {schema, model} from "mongoose";

const cartsCollection = "carts";

const cartSchema = new schema({
    products: {
        type: [
            {
                quantity: { type: Number, default: 0 },
                product: { type: schema.Types.ObjectId, ref: "products" },
                _id: false,
            },
        ],
    },
});

export const cartModel = model(cartsCollection, cartSchema);