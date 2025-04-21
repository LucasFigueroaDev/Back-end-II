import { adminController } from "../controllers/admin.controller.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import { Router } from "express";
import { validateId } from "../middlewares/validator/validate.id.js";
import { validateEmail } from "../middlewares/validator/validate.email.js";
import passport from "passport";

const router = Router();

router.get('/users', passport.authenticate('jwt-cookies', { session: false }), adminOnly, adminController.getAll);
router.get('/users/:id', passport.authenticate('jwt-cookies', { session: false }), adminOnly, validateId('id'), adminController.getUserById);
router.put('/users/:id', passport.authenticate('jwt-cookies', { session: false }), adminOnly, validateId('id'), adminController.adminUpdateUser);

export default router;