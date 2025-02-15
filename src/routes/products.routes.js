import { Router } from 'express';
import productsController from '../controllers/products.controller.js';

const router = Router();

// Rutas para productos
router.get('/getAll', productsController.getAll);
router.get('/getOne/:id', productsController.getOne);
router.post('/insert', productsController.insert);
router.put('/updateOne/:id', productsController.updateOne);
router.delete('/deleteOne/:id', productsController.deleteOne);

export default router;
