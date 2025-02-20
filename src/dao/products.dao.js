import Product from '../models/Product.js';

const productDao = {};

//  Obtener todos los productos
productDao.getAll = async () => {
    try {
        return await Product.find();
    } catch (error) {
        throw new Error(`Error al obtener productos: ${error.message}`);
    }
};

//  Obtener un solo producto
productDao.getOne = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    } catch (error) {
        throw new Error(`Error al obtener producto: ${error.message}`);
    }
};

// Insertar producto
productDao.insert = async (product) => {
    try {
        return await Product.create(product);
    } catch (error) {
        throw new Error(`Error al insertar producto: ${error.message}`);
    }
};

//  Actualizar producto
productDao.updateOne = async (id, productData) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!updatedProduct) {
            throw new Error("Producto no encontrado");
        }
        return updatedProduct;
    } catch (error) {
        throw new Error(`Error al actualizar producto: ${error.message}`);
    }
};

//  Eliminar producto
productDao.deleteOne = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error("Producto no encontrado");
        }
        return deletedProduct;
    } catch (error) {
        throw new Error(`Error al eliminar producto: ${error.message}`);
    }
};

export default productDao;
