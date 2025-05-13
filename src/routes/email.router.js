import { Router } from "express";
import { sendMailEth } from "../controllers/email.controller.js";

const router = Router();

router.post('/', sendMailEth);

export default router;