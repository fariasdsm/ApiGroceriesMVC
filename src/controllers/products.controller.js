import productsDao from '../dao/products.dao.js';
const productsController = {};

// Obtener todos los productos
productsController.getAll = (req, res) => {
    productsDao.getAll()
        .then((products) => {
            res.json(products);  // Enviar productos como JSON
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al obtener los productos.'
            });
        });
};

// Obtener un producto específico
productsController.getOne = (req, res) => {
    productsDao.getOne(req.params.barcode)
        .then((product) => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: `Producto con código de barras ${req.params.barcode} no encontrado.` });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al obtener el producto.'
            });
        });
};

// Insertar un nuevo producto
productsController.insert = (req, res) => {
    productsDao.insert(req.body)
        .then((response) => {
            res.status(201).json({ 
                message: 'Producto insertado exitosamente.', 
                data: response 
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al insertar el producto.'
            });
        });
};

// Actualizar un producto existente
productsController.updateOne = (req, res) => {
    productsDao.updateOne(req.body, req.params.barcode)
        .then((result) => {
            if (result.modifiedCount > 0) {
                res.json({ message: 'Producto actualizado exitosamente.' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado o sin cambios.' });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al actualizar el producto.'
            });
        });
};

// Eliminar un producto
productsController.deleteOne = (req, res) => {
    productsDao.deleteOne(req.params.barcode)
        .then((result) => {
            if (result.deletedCount > 0) {
                res.json({ message: 'Producto eliminado exitosamente.' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado.' });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al eliminar el producto.'
            });
        });
};

export default productsController;