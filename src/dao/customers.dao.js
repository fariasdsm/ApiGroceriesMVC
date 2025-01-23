import Customers from "../models/Customers.js";

const customersDao = {};

customersDao.getAll = async () => {
    return await Customers.find();
};

customersDao.getOne = async (customer_number) => {
    return await Customers.findOne({ customer_number: customer_number }); 
};

export default customersDao;
