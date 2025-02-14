import Customers from "../models/Customers.js";

const customersDao = {};

customersDao.getAll = async () => {
    return await Customers.find();
};

customersDao.getOne = async (customer_number) => {
    return await Customers.findOne({ customer_number: customer_number }); 
};

customersDao.insert = async (customer) => {
    return await Customers.create(customer);
};

customersDao.updateOne = async (customer, customer_number) => {
    return await Customers.findOneAndUpdate({ customer_number: customer_number }, customer);
};

customersDao.deleteOne = async (customer_number) => {
    return await Customers.findOneAndDelete({ customer_number: customer_number });
};

export default customersDao;
