import { ticketRepository } from "../repositories/ticket.repository.js";
import { createResponse } from "../utils/createResponse.js";

class TicketController{
    constructor(repository) {
        this.repository = repository;
    }

    generateTicket = async (req, res, next) => {
        try {
            const user = req.user;
            const data = await this.repository.generateTicket(user);
            createResponse(res, 201, { message: 'Ticket generado', data });
        } catch (error) {
            next(error);
        }
    }
}

export const ticketController = new TicketController(ticketRepository);