import { Schema, model } from "mongoose";

const usersCollection = "users";

const userSchema = new Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
    reset_password_token: { type: String},
    reset_password_expires: { type: Date},
    role: { type: String, default: "user" },
    cart: { type: Schema.Types.ObjectId, ref: "carts", default: null },
}, {
    timestamps: true
});

export const UserModel = model(usersCollection, userSchema);