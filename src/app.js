//Aqui va la configurscion del servidor
import express from 'express';
import morgan from 'morgan';
import productsRoutes from './routes/products.routes.js';
const app = express();
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Routes
app.use('/groceries/products', productsRoutes);


export default app;