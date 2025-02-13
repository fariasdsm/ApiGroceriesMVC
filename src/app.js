import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';
import employeesRoutes from './routes/employees.routes.js';
import customersRoutes from './routes/customers.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configuración del servidor
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(morgan('dev'));
app.use(cors()); // Habilita CORS para permitir comunicación con React
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de la API
app.use('/groceries/products', productsRoutes);
app.use('/groceries/employees', employeesRoutes);
app.use('/groceries/customers', customersRoutes);

// Ruta base para verificar que la API funciona
app.get('/', (req, res) => {
    res.json({ message: "API-GROCERIES-MVC funcionando correctamente" });
});

export default app;
