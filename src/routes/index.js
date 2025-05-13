import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import adminRouter from "./admin.router.js";
import emailRouter from "./email.router.js";

const router = Router();

router.use('/products', productRouter);
router.use('/sessions', userRouter);
router.use('/admin', adminRouter);
router.use('/send', emailRouter);

export default router;