import Customers from '../models/Customers.js';

const customersDao = {};

customersDao.getAll = async () => await Customers.find();
customersDao.getOne = async (id) => await Customers.findById(id);
customersDao.insert = async (customer) => await Customers.create(customer);
customersDao.updateOne = async (id, customerData) => await Customers.findByIdAndUpdate(id, customerData, { new: true });
customersDao.deleteOne = async (id) => await Customers.findByIdAndDelete(id);

export default customersDao;