import mongoose from 'mongoose';
import customersDao from '../dao/customers.dao.js';

const customersController = {};

customersController.getAll = async (req, res) => {
    try {
        const customers = await customersDao.getAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes.' });
    }
};

customersController.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const customer = await customersDao.getOne(id);
        customer ? res.json(customer) : res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente.' });
    }
};

customersController.insert = async (req, res) => {
    try {
        const newCustomer = await customersDao.insert(req.body);
        res.status(201).json({ message: 'Cliente insertado', data: newCustomer });
    } catch (error) {
        res.status(500).json({ message: 'Error al insertar el cliente.' });
    }
};

customersController.updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const updatedCustomer = await customersDao.updateOne(id, req.body);
        updatedCustomer ? res.json({ message: 'Cliente actualizado' }) : res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente.' });
    }
};

customersController.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const deletedCustomer = await customersDao.deleteOne(id);
        deletedCustomer ? res.json({ message: 'Cliente eliminado' }) : res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente.' });
    }
};

export default customersController;