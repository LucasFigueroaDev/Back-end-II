import { Schema, model } from "mongoose";

const usersCollection = "users";

const userSchema = new Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user" },
    cart_id: { type: Schema.Types.ObjectId, ref: "carts", default: [] },
});

export const UserModel = model(usersCollection, userSchema);