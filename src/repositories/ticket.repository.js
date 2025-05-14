import CustomError from "../utils/customError.js";
import { ticketDao } from "../dao/ticket.dao.js";
import { cartRepository } from "./cart.reposiroty.js";
import { productRepository } from "./product.repository.js";

class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    generateTicket = async (user) => {
        try {
            const cart = await cartRepository.getById(user.cart);
            let amountAcc = 0;
            const prodsNoStock = [];
            for (const prod of cart.products) {
                const idprod = prod.product;
                const prodDB = await productRepository.getById(idprod);
                if (prodDB.stock > prod.stock) {
                    prodsNoStock.push(idprod);
                    throw new CustomError(404, 'La cantidad supera el stock del producto');
                }
                const amount = prod.quantity * prodDB.price;
                amountAcc += amount;
            }

            const ticket = await this.dao.create({ code: Math.floor(Math.random() * 100000), purchase_datetime: new Date(), amount: amountAcc, purchaser: user.email });
            if (!ticket) {
                throw new CustomError(404, 'Error al crear el ticket');
            }
            await cartRepository.clearCart(user.cart);
            return ticket;
        } catch (error) {
            throw error;
        }
    }
}

export const ticketRepository = new TicketRepository(ticketDao);