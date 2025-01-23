import {Router} from 'express';
import customersController from '../controllers/customers.controller.js';

const router = Router();

router.get('/getAll', customersController.getAll);
router.get('/getOne/:customer_number', customersController.getOne);

export default router;