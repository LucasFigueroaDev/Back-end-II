import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import passport from "passport";

const router = Router();

router.get('/', productController.getAll);
router.post('/', passport.authenticate('jwt-cookies', { session: false }), adminOnly, productController.create);
router.get('/:pid', productController.getById);
router.put('/:pid', passport.authenticate('jwt-cookies', { session: false }), adminOnly, productController.update);
router.delete('/:pid', passport.authenticate('jwt-cookies', { session: false }), adminOnly, productController.delete);

export default router;