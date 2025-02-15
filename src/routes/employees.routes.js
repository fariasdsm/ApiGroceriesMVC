import { Router } from 'express';
import employeesController from '../controllers/employees.controller.js';

const router = Router();

// ✅ Obtener todos los empleados
router.get('/getAll', employeesController.getAll);

// ✅ Obtener un empleado por _id en lugar de employee_number
router.get('/getOne/:id', employeesController.getOne);

// ✅ Insertar un nuevo empleado
router.post('/insert', employeesController.insert);

// ✅ Actualizar un empleado por _id
router.put('/updateOne/:id', employeesController.updateOne);

// ✅ Eliminar un empleado por _id
router.delete('/deleteOne/:id', employeesController.deleteOne);

export default router;
