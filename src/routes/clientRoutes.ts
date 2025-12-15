import { Router } from 'express';
import * as ClientController from '../controllers/clientController';
import { protect } from '../middlewares/authMiddleware';


const router = Router();

router.post('/register', ClientController.registerClient);
router.get('/', protect, ClientController.getAllClients);

export default router;

