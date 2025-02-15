import Product from '../models/Product.js';

const productDao = {};

productDao.getAll = async () => {
    return await Product.find();
};

productDao.getOne = async (id) => {
    return await Product.findById(id);
};

productDao.insert = async (product) => {
    return await Product.create(product);
};

productDao.updateOne = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

productDao.deleteOne = async (id) => {
    return await Product.findByIdAndDelete(id);
};

export default productDao;