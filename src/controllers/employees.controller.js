import employeesDao from '../dao/employees.dao.js';
const employeesController = {};
import mongoose from 'mongoose';


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
    const { id } = req.params; // Ahora usamos el _id
    employeesDao.updateOne(req.body, id) // Cambia employee_number por id
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Empleado no encontrado o sin cambios.' });
            }
            res.json({ message: 'Empleado actualizado exitosamente.', data: result });
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Error al actualizar el empleado.',
            });
        });
};

// Eliminar un empleado

employeesController.deleteOne = async (req, res) => {
    try {
        console.log("🔍 Intentando eliminar el empleado con ID:", req.params.id);

        // Validar si el ID es undefined, vacío o no es un ObjectId válido
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.error("❌ ID inválido:", req.params.id);
            return res.status(400).json({ message: "ID no válido o vacío" });
        }

        // Convertir a ObjectId de forma segura
        const id = new mongoose.Types.ObjectId(req.params.id);

        const result = await employeesDao.deleteOne(id);

        if (result) {
            console.log("✅ Empleado eliminado correctamente:", id);
            res.json({ message: 'Empleado eliminado exitosamente.' });
        } else {
            console.log("❌ Empleado no encontrado con ID:", id);
            res.status(404).json({ message: 'Empleado no encontrado.' });
        }
    } catch (error) {
        console.error("❌ Error al eliminar empleado:", error);
        res.status(500).json({ message: error.message || 'Error al eliminar el empleado.' });
    }
};



export default employeesController;