import { Router } from "express";
import { resetPassword, sendMail, getResetPasswordForm } from "../controllers/email.controller.js";
import { validateEmail } from "../middlewares/validator/validate.email.js";

const router = Router();

router.get('/reset-password/:token', getResetPasswordForm);
router.post('/forgot-password', validateEmail, sendMail);
router.post('/reset-password/:token', resetPassword);

export default router;