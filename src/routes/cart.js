import express from 'express';
import cartController from '../app/controller/cartController.js';
import middlewareAuth from '../middleware/middlewareAuth.js';

const route = express.Router();

route.patch('/update/:idAuth/:idProduct/:count', middlewareAuth.verifyToken, cartController.update);

route.delete('/delete/:id', middlewareAuth.verifyToken, cartController.delete);

route.post('/create', middlewareAuth.verifyToken,cartController.create);

route.get('/', cartController.list);

export default route