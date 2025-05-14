import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { validateEmail } from "../middlewares/validator/validate.email.js";
import { validateUserAction } from "../middlewares/validator/validate.User.Action.js";
import passport from "passport";

const router = Router();

router.post('/login', validateEmail, userController.login);
router.post('/register', validateEmail, userController.register);
router.put('/:id', passport.authenticate('jwt-cookies', { session: false }), validateUserAction, userController.updateUser);
router.delete('/:id', passport.authenticate('jwt-cookies', { session: false }), validateUserAction, userController.delete);
router.get('/current', passport.authenticate('jwt-cookies', { session: false }), userController.profile);

export default router;