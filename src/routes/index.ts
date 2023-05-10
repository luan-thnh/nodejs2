import { Router } from 'express';
import AuthController from '../controllers/auth_controller';

const router = Router();

/* GET home page. */
router.post('/login', AuthController.index);

export default router;
