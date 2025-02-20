import mongoose from "mongoose";
import Employees from "../models/Employees.js";

const employeesDao = {};

employeesDao.getAll = async () => {
    return await Employees.find();
};

employeesDao.getOne = async (employee_number) => {
    return await Employees.findOne({ employee_number });
};

employeesDao.insert = async (employee) => {
    return await Employees.create(employee);
};

employeesDao.updateOne = async (employeeData, id) => {
    try {
        const updatedEmployee = await Employees.findByIdAndUpdate(id, employeeData, { new: true });
        return updatedEmployee;
    } catch (error) {
        console.error("❌ Error en updateOne DAO:", error);
        throw error;
    }
};

employeesDao.deleteOne = async (id) => {
    console.log("ID recibido en DAO:", id); // 👈 Verifica qué ID llega aquí
    return await Employees.findByIdAndDelete(id);
};

export default employeesDao;
