import { Router } from 'express';
import productsController from '../controllers/products.controller.js';

const router = Router();

// Rutas para productos
router.get('/getAll', productsController.getAll);
router.get('/getOne/:id', productsController.getOne);
router.post('/insert', productsController.insert);
router.put('/update/:id', productsController.updateOne);
router.delete('/delete/:id', productsController.deleteOne);

export default router;
