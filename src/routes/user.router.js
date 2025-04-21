import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import { validateEmail } from "../middlewares/validator/validate.email.js";
import { validateId } from "../middlewares/validator/validate.id.js";
import { checkRole } from "../middlewares/checkRole.js";
import { validateUserUpdate } from "../middlewares/validator/validate.User.Update.js";
import passport from "passport";

const router = Router();

router.post('/login', validateEmail, userController.login);
router.post('/register', validateEmail, userController.register);
router.put('/:id',passport.authenticate('jwt-cookies', { session: false }), validateId('id'), validateUserUpdate, userController.update);
router.delete('/:id', validateId('id'), userController.delete);
router.get('/current', passport.authenticate('jwt-cookies', { session: false }), userController.logged);

export default router;