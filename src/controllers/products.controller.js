import mongoose from 'mongoose';
import productsDao from '../dao/products.dao.js';

const productsController = {};

//  Obtener todos los productos
productsController.getAll = async (req, res) => {
    try {
        const products = await productsDao.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
};

//  Obtener un solo producto por ID
productsController.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const product = await productsDao.getOne(id);
        product ? res.json(product) : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto.' });
    }
};

//  Insertar un producto
productsController.insert = async (req, res) => {
    try {
        console.log(" Recibiendo datos en el backend:", req.body);

        const { barcode, description, brand, price, cost, expired_date, stock } = req.body;

        //  Validación de datos
        if (!barcode || !description || !brand || !price || !cost || !expired_date || !stock) {
            console.error("❌ Datos inválidos o faltantes:", req.body);
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const formattedBarcode = String(barcode).trim(); 
        const formattedDate = new Date(expired_date); 

        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ message: "Fecha de expiración no válida." });
        }

        const newProduct = await productsDao.insert({
            barcode: formattedBarcode,
            description,
            brand,
            price: Number(price),
            cost: Number(cost),
            expired_date: formattedDate,
            stock: Number(stock)
        });

        console.log("✅ Producto insertado correctamente:", newProduct);
        res.status(201).json({ message: "Producto insertado", data: newProduct });

    } catch (error) {
        console.error("❌ Error al insertar producto:", error);
        res.status(500).json({ message: "Error al insertar el producto." });
    }
};

//  Actualizar un producto
productsController.updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }

        const updatedData = { ...req.body };

        if (updatedData.expired_date) {
            const formattedDate = new Date(updatedData.expired_date);
            if (isNaN(formattedDate.getTime())) {
                return res.status(400).json({ message: "Fecha de expiración no válida." });
            }
            updatedData.expired_date = formattedDate;
        }

        const updatedProduct = await productsDao.updateOne(id, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado', data: updatedProduct });

    } catch (error) {
        console.error("❌ Error al actualizar producto:", error);
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};

//  Eliminar un producto
productsController.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }

        console.log(`🗑️ Eliminando producto con ID: ${id}`);
        const deletedProduct = await productsDao.deleteOne(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado' });

    } catch (error) {
        console.error("❌ Error al eliminar producto:", error);
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
};

export default productsController;