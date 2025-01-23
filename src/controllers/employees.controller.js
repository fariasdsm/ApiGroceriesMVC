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




export default employeesController; 
