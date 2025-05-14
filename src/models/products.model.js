import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const ProductSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    stock: {type: Number, require: true},
    category: {type: String, require: true},
    status: {type: Boolean, default: true},
    thumbnail: {type: String}
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model(productsCollection, ProductSchema);