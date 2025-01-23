import productsDao from '../dao/products.dao.js';
const productsController = {};

productsController.getAll = (req, res) => {
    productsDao.getAll()
        .then((products) => {
            res.json({
                data: products
            });
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while retrieving products.'
                }
            });
        });
};

productsController.getOne = (req, res) => {
    productsDao.getOne(req.params.barcode)
        .then((product) => {
            if (product) {
                res.json({ data: product });
            } else { 
                res.json({ data: { message: `Product with barcode ${req.params.barcode} not found` } });
            }
        })
        .catch((error) => {
            res.json({
                data: {
                    message: error.message || 'Some error occurred while retrieving product.'
                }
            });
        });
};


export default productsController;
