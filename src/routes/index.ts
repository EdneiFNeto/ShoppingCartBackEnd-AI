import { Router } from 'express';

import productRoutes from './productRoutes';
import authRoutes from './authRoutes';
import clientRoutes from './clientRoutes';
import shoppingCartRoutes from './shoppingCartRoutes';

const router = Router();

router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/clients', clientRoutes);
router.use('/cart', shoppingCartRoutes);

export default router;


