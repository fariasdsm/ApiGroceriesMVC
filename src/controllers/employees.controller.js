import employeesDao from '../dao/employees.dao.js';
const employeesController = {};

// Obtener todos los empleados
employeesController.getAll = (req, res) => {
    employeesDao.getAll()
        .then((employees) => { 
            res.json(employees);  // Enviar directamente los datos sin encapsular en 'data'
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al obtener los empleados.'
            });
        });
};

// Obtener un empleado específico
employeesController.getOne = (req, res) => {
    employeesDao.getOne(req.params.employee_number)
        .then((employee) => {
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ message: `Empleado con número ${req.params.employee_number} no encontrado.` });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al obtener el empleado.'
            });
        });
};

// Insertar un nuevo empleado
employeesController.insert = (req, res) => {
    employeesDao.insert(req.body)
        .then((response) => {
            res.status(201).json({ 
                message: 'Empleado insertado exitosamente.', 
                data: response 
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al insertar el empleado.'
            });
        });
};

// Actualizar un empleado existente
employeesController.updateOne = (req, res) => {
    employeesDao.updateOne(req.body, req.params.employee_number)
        .then((result) => {
            if (result.modifiedCount > 0) {
                res.json({ message: 'Empleado actualizado exitosamente.' });
            } else {
                res.status(404).json({ message: 'Empleado no encontrado o sin cambios.' });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al actualizar el empleado.'
            });
        });
};

// Eliminar un empleado
employeesController.deleteOne = (req, res) => {
    employeesDao.deleteOne(req.params.employee_number)
        .then((result) => {
            if (result.deletedCount > 0) {
                res.json({ message: 'Empleado eliminado exitosamente.' });
            } else {
                res.status(404).json({ message: 'Empleado no encontrado.' });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al eliminar el empleado.'
            });
        });
};

export default employeesController;