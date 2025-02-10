import customersDao from '../dao/customers.dao.js';
const customersController = {};

// Obtener todos los clientes
customersController.getAll = (req, res) => {
    customersDao.getAll()
        .then((customers) => { 
            res.json(customers);  // Cambiado de res.render a res.json
        })
        .catch((error) => {
            res.status(500).json({ 
                message: error.message || 'Error al obtener los clientes.' 
            });
        });
};

// Obtener un cliente específico
customersController.getOne = (req, res) => {
    customersDao.getOne(req.params.customer_number)
        .then((customer) => {
            if (customer) {
                res.json(customer);
            } else {
                res.status(404).json({ 
                    message: 'Cliente no encontrado.' 
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ 
                message: error.message || 'Error al obtener el cliente.' 
            });
        });
};

// Insertar un nuevo cliente
customersController.insert = (req, res) => {
    customersDao.insert(req.body)
        .then((response) => {
            res.status(201).json({ 
                message: 'Cliente insertado exitosamente.', 
                data: response 
            });
        })
        .catch((error) => {
            res.status(500).json({ 
                message: error.message || 'Error al insertar el cliente.' 
            });
        });
};

// Actualizar un cliente existente
customersController.updateOne = (req, res) => {
    customersDao.updateOne(req.body, req.params.customer_number)
        .then((response) => {
            if (response.modifiedCount > 0) {
                res.json({ message: 'Cliente actualizado exitosamente.' });
            } else {
                res.status(404).json({ message: 'Cliente no encontrado o sin cambios.' });
            }
        })
        .catch((error) => {
            res.status(500).json({ 
                message: error.message || 'Error al actualizar el cliente.' 
            });
        });
};

// Eliminar un cliente
customersController.deleteOne = (req, res) => {
    customersDao.deleteOne(req.params.customer_number)
        .then((response) => {
            if (response.deletedCount > 0) {
                res.json({ message: 'Cliente eliminado exitosamente.' });
            } else {
                res.status(404).json({ message: 'Cliente no encontrado.' });
            }
        })
        .catch((error) => {
            res.status(500).json({ 
                message: error.message || 'Error al eliminar el cliente.' 
            });
        });
};

export default customersController;