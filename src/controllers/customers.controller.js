import customersDao from '../dao/customers.dao.js';
const customersController = {}; 

customersController.getAll = (req, res) => {
    customersDao.getAll()
        .then((customers) => { 
            res.json({
                data: customers,
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while retrieving customers.', 
                },
            });
        });
};

customersController.getOne = (req, res) => {
    customersDao.getOne(req.params.customer_number) 
        .then((customer) => {
            if (customer) {
                res.json({ data: customer });
            } else {
                res.json({ data: { message: `Customer with customer_number ${req.params.customer_number} not found` } });
            }
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while retrieving customer.',
                },
            });
        });
};

customersController.insert = (req, res) => {
    customersDao.insert(req.body)
        .then((response) => {
            res.json({ message: 'Customer inserted successfully', customer: response });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while inserting customer.',
                },
            });
        });
};

customersController.updateOne = (req, res) => {
    customersDao.updateOne(req.body, req.params.customer_number)
        .then((result) => {
            res.json({
                data: {
                    message: 'Customer updated successfully',
                    result: result,
                },
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while updating customer.',
                },
            });
        });
};

customersController.deleteOne = (req, res) => {
    customersDao.deleteOne(req.params.customer_number)
        .then((result) => {
            res.json({
                data: {
                    message: 'Customer deleted successfully',
                    result: result,
                },
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while deleting customer.',
                },
            });
        });
}


export default customersController;
