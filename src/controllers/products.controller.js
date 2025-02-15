import mongoose from 'mongoose';
import productsDao from '../dao/products.dao.js';

const productsController = {};

productsController.getAll = async (req, res) => {
    try {
        const products = await productsDao.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
};

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

productsController.insert = async (req, res) => {
    try {
        console.log("📥 Recibiendo datos en el backend:", req.body);
        console.log("🔍 Tipo de `barcode` recibido:", typeof req.body.barcode); // 👈 Verifica el tipo de dato

        const { barcode, description, brand, price, cost, expired_date, stock } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!barcode || !description || !brand || !price || !cost || !expired_date || !stock) {
            console.error("❌ Datos inválidos o faltantes:", req.body);
            return res.status(400).json({ message: "Todos los campos son obligatorios, incluyendo el código de barras." });
        }

        // Asegurar que `barcode` es un String válido y sin espacios extra
        const formattedBarcode = String(barcode).trim(); 

        // Convertir a números los campos numéricos
        const newProduct = await productsDao.insert({
            barcode: formattedBarcode,
            description,
            brand,
            price: Number(price),
            cost: Number(cost),
            expired_date,
            stock: Number(stock)
        });

        console.log("✅ Producto insertado correctamente:", newProduct);
        res.status(201).json({ message: "Producto insertado", data: newProduct });

    } catch (error) {
        console.error("❌ Error al insertar producto en MongoDB:", error);
        res.status(500).json({ message: error.message || "Error al insertar el producto." });
    }
};



productsController.updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const updatedProduct = await productsDao.updateOne(id, req.body);
        updatedProduct ? res.json({ message: 'Producto actualizado' }) : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};

productsController.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const deletedProduct = await productsDao.deleteOne(id);
        deletedProduct ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto.' });
    }
};

export default productsController;