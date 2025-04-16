import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { validateEmail } from "../middlewares/validate-email.js";
import {validateId} from "../middlewares/validate-id.js";

const router = Router();

router.get('/', userController.getAll);
router.get('/:email', validateEmail, userController.getByEmail);
router.post('/', userController.create);
router.put('/:id',validateId, userController.update);
router.delete('/:id', validateId, userController.delete);

export default router;