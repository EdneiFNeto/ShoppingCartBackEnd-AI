import { Router } from 'express';
import * as ShoppingCartController from '../controllers/shoppingCartController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Adiciona um item ao carrinho
router.post('/items', protect, ShoppingCartController.addProductToCart);
router.get('/', protect, ShoppingCartController.getCart);
router.delete('/items/:itemId', protect, ShoppingCartController.deleteProductFromCart);

export default router;

