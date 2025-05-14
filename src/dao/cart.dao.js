import MongoDao from "./mongo.dao.js";
import { CartModel } from "../models/carts.models.js";

class CartDao extends MongoDao {
    constructor(model) {
        super(model);
    }

    create = async () => {
        try {
            return await this.model.create({ products: [] });
        } catch (error) {
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try {
            return await this.model.findById(id).populate("products.product");
        } catch (error) {
            throw new Error(error);
        }
    }

    addProdToCart = async (cid, pid) => {
        try {
            const cart = await this.model.findOne({
                _id: cid,
                "products.product": pid
            });

            if (cart) {
                const prod = cart.products.find(p => p.product.toString() === pid.toString());
                const newQuantity = (prod?.quantity || 0) + 1;

                return await this.model.findOneAndUpdate(
                    { _id: cid, "products.product": pid },
                    {
                        $set: {
                            "products.$.quantity": newQuantity
                        },
                    },
                    { new: true }
                );
            } else {
                return await this.model.findByIdAndUpdate(
                    cid,
                    { $push: { products: { product: pid, quantity: 1 } } },
                    { new: true }
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };


    existProdInCart = async (cid, pid) => {
        try {
            return await this.model.findOne({
                _id: cid,
                products: { $elemMatch: { product: pid } },
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    removeProdToCart = async (cid, pid) => {
        try {
            return await this.model.findByIdAndUpdate(
                { _id: cid }, 
                { $pull: { products: { product: pid } } }, 
                { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    update = async (id, obj) => {
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProdQuantity = async (cid, pid, quantity) => {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid, "products.product": pid },
                { $set: { "products.$.quantity": quantity } },
                { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    clearCart = async (cid) => {
        try {
            return await this.model.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const cartDao = new CartDao(CartModel);