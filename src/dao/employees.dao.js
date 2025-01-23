import Employees from "../models/Employees.js";

const employeesDao = {};


employeesDao.getAll = async () => {
    return await Employees.find();
};


employeesDao.getOne = async (employee_number) => {
    return await Employees.findOne({ employee_number }); 
};

export default employeesDao;
