import { Router } from 'express';
import * as ProductController from '../controllers/productController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, ProductController.getAllProducts);
router.get('/:id', protect, ProductController.getProductById);
router.post('/', protect, ProductController.createProduct);

export default router;