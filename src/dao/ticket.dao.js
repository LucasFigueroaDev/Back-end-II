import mongoDao from "./mongo.dao.js";
import { TicketModel } from "../models/ticket.model.js";

class TicketDao extends mongoDao {
    constructor(model) {
        super(model);
    }
}

export const ticketDao = new TicketDao(TicketModel);