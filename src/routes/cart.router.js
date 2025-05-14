import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { adminOnly } from "../middlewares/adminOnly.js";
import passport from "passport";

const router = Router();

router.get('/', passport.authenticate('jwt-cookies', { session: false }), adminOnly, cartController.getAll); 
router.get('/:cid', passport.authenticate('jwt-cookies', { session: false }), cartController.getById); 
router.post('/', passport.authenticate('jwt-cookies', { session: false }), adminOnly, cartController.create);
router.post('/products/:pid', passport.authenticate('jwt-cookies', { session: false }), cartController.addProdToCart); 
router.put('/:cid', passport.authenticate('jwt-cookies', { session: false }),adminOnly, cartController.update);
router.put('/:cid/products/:pid', passport.authenticate('jwt-cookies', { session: false }), cartController.updateProdQuantity); 
router.delete('/:cid/products/:pid', passport.authenticate('jwt-cookies', { session: false }), cartController.removeProdToCart); 
router.delete('/clear/:cid', passport.authenticate('jwt-cookies', { session: false }), cartController.clearCart); 

export default router;