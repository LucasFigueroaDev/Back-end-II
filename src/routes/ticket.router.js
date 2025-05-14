import { Router } from "express";
import { ticketController } from "../controllers/ticket.controller.js";
import passport from "passport";

const router = Router();

router.post('/purchase', passport.authenticate('jwt-cookies', { session: false }), ticketController.generateTicket);

export default router;