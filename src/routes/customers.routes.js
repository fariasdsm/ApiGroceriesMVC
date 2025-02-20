import { Router } from 'express';
import customersController from '../controllers/customers.controller.js';

const router = Router();

router.get('/getAll', customersController.getAll);
router.get('/getOne/:id', customersController.getOne);
router.post('/insert', customersController.insert);
router.put('/update/:id', customersController.updateOne);
router.delete('/deleteOne/:id', customersController.deleteOne);

export default router;