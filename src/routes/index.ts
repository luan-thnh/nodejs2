import { Router } from 'express';
import UsersController from '../controllers/users_controller';

const router = Router();

/* GET home page. */
router.get('/', UsersController.index);
router.get('/:id', UsersController.show);
router.post('/', UsersController.create);
router.post('/:id', UsersController.update);
router.post('/:id', UsersController.delete);

export default router;
