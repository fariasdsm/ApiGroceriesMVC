//Aqui va la configurscion del servidor
import express from 'express';
import morgan from 'morgan';
const app = express();
//Settings
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Routes


export default app;