import CustomError from "../utils/customError.js";
import { cartDao } from "../dao/cart.dao.js"
import { productRepository } from "./product.repository.js";

class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = async () => {
        try {
            const result = await this.dao.getAll();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try {
            const result = await this.dao.getById(id);
            if (!result) throw new CustomError(404, ' El carrito no existe');
            return result;
        } catch (error) {
            throw error;
        }
    }

    existProdInCart = async (cid, pid) => {
        try {
            const response = await this.dao.existProdInCart(cid, pid);
            if (!response) throw new CustomError('no se encuentra el producto en el carrito', 404)
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    addProdToCart = async (cid, id) => {
        try {
            const existCart = await this.getById(cid);
            const existProd = await productRepository.getById(id);
            return await this.dao.addProdToCart(existCart._id, existProd._id);
        } catch (error) {
            throw error;
        }
    }

    removeProdToCart = async (cid, pid) => {
        try {
            const existCart = await this.getById(cid);
            const existProdInCart = await this.existProdInCart(cid, pid);
            return await this.dao.removeProdToCart(existCart._id, pid);
        } catch (error) {
            throw error;
        }
    }

    updateProdQuantity = async (cid, pid, quantity) => {
        try {
            const existCart = await this.getById(cid);
            const existProdInCart = await this.existProdInCart(cid, pid);
            return await this.dao.updateProdQuantity(existCart._id, pid, quantity);
        } catch (error) {
            throw error;
        }
    }

    clearCart = async (cid) => {
        try {
            const existCart = await this.getById(cid);
            return await this.dao.clearCart(existCart._id);
        } catch (error) {
            throw error;
        }
    }
}

export const cartRepository = new CartRepository(cartDao);