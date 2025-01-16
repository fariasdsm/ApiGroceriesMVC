import Product from '../models/Product.js';
const productDao = {};
productDao.getAll = async () => {
    return await Product.find();
}

export default productDao;