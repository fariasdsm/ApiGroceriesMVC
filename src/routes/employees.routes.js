import { Router } from 'express';
import employeesController from '../controllers/employees.controller.js';

const router = Router();

router.get('/getAll', employeesController.getAll);
router.get('/getOne/:id', employeesController.getOne);
router.post('/insert', employeesController.insert);
router.put('/update/:id', employeesController.updateOne);
router.delete('/deleteOne/:id', employeesController.deleteOne);

export default router;
