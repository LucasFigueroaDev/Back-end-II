import { cartRepository } from "../repositories/cart.reposiroty.js";
import { createResponse } from "../utils/createResponse.js";

class CartController {
    constructor(repository) {
        this.repository = repository
    }

    getAll = async (req, res, next) => {
        try {
            const data = await this.repository.getAll();
            createResponse(res, 200, data);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const data = await this.repository.getById(cid);
            createResponse(res, 200, data);
        } catch (error) {
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const data = await this.repository.create(req.body);
            createResponse(res, 201, data);
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const data = await this.repository.update(cid, req.body);
            createResponse(res, 200, data);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const data = await this.repository.delete(cid);
            createResponse(res, 200, data);
        } catch (error) {
            next(error);
        }
    }

    addProdToCart = async (req, res, next) => {
        try {
            const { cart } = req.user;
            const { pid } = req.params;
            const newProdToUserCart = await this.repository.addProdToCart(cart, pid);
            createResponse(res, 200, { message: 'Producto agregado al carrito', newProdToUserCart });
        } catch (error) {
            next(error);
        }
    }

    removeProdToCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { pid } = req.params;
            const delProdToUserCart = await this.repository.removeProdToCart(cid, pid);
            createResponse(res, 200, { message: 'Producto eliminado del carrito', delProdToUserCart });
        } catch (error) {
            next(error);
        }
    }

    updateProdQuantity = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const { pid } = req.params;
            const { quantity } = req.body;
            const updateQuantity = await this.repository.updateProdQuantity(
                cid, pid, quantity);
            createResponse(res, 200, updateQuantity);
        } catch (error) {
            next(error);
        }
    }

    clearCart = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const clearCart = await this.repository.clearCart(cid);
            createResponse(res, 200, { message: 'Carrito limpiado', clearCart });
        } catch (error) {
            next(error);
        }
    }
}

export const cartController = new CartController(cartRepository);