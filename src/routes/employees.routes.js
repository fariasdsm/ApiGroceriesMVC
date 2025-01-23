import {Router} from 'express';
import employeesController from '../controllers/employees.controller.js';

const router = Router();

router.get('/getAll', employeesController.getAll);
router.get('/getOne/:employee_number', employeesController.getOne);


export default router;