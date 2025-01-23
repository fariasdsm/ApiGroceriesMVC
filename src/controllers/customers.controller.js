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


export default customersController;
