import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import cartRouter from "./cart.router.js";
import emailRouter from "./email.router.js";
import ticketRouter from "./ticket.router.js";

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/send', emailRouter);
router.use('/carts', cartRouter);
router.use('/ticket', ticketRouter);

export default router;