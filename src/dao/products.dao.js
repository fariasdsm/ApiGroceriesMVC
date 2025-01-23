import Product from '../models/Product.js';

const productDao = {};
productDao.getAll = async () => {
    return await Product.find();
}
productDao.getOne = async (barcode) => {
    return await Product.findOne({ barcode: barcode });
}

export default productDao;