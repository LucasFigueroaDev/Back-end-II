import { Router } from "express";
import { userController } from "../controllers/users-controller.js";
import { validateEmail } from "../middlewares/validate-email.js";
import {validateId} from "../middlewares/validate-id.js";

const router = Router();

router.post('/login', validateEmail, userController.login);
router.post('/register', validateEmail, userController.register);
router.put('/:id',validateId, userController.update);
router.delete('/:id', validateId, userController.delete);

export default router;