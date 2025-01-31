import e from 'express';
import employeesDao from '../dao/employees.dao.js';
const employeesController = {}; 

employeesController.getAll = (req, res) => {
    employeesDao.getAll()
        .then((employees) => { 
            res.json({
                data: employees,
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while retrieving employees.',
                },
            });
        });
};

employeesController.getOne = (req, res) => {
    employeesDao.getOne(req.params.employee_number) // Cambiado a employee_number
        .then((employee) => {
            if (employee) {
                res.json({ data: employee });
            } else {
                res.json({ data: { message: `Employee with employee_number ${req.params.employee_number} not found` } }); // Mensaje actualizado
            }
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while retrieving employee.',
                },
            });
        });
};

employeesController.insert = (req, res) => {
    employeesDao.insert(req.body)
        .then((response) => {
            res.json({ message: 'Employee inserted successfully', employee: response });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while inserting employee.',
                },
            });
        });
}

employeesController.updateOne = (req, res) => {
    employeesDao.updateOne(req.body, req.params.employee_number)
    .then((result) => {
        res.json({
            data: {
                message: 'Employee updated successfully',
                result: result
            }
        })
    })
    .catch((error) => {
        res.json({
            data: {
                message: error.message || 'Some error occurred while updating employee.'
            }
        })
    })
}

employeesController.deleteOne = (req, res) => {
    employeesDao.deleteOne(req.params.employee_number)
    .then((result) => {
        res.json({
            data: {
                message: 'Employee deleted successfully',
                result: result
            }
        })
    })
    .catch((error) => {
        res.json({
            data: {
                message: error.message || 'Some error occurred while deleting employee.'
            }
        })
    }
    )};


export default employeesController; 
