import express from 'express';
import wishlistController from '../app/controller/wishlistController.js';
import middlewareAuth from '../middleware/middlewareAuth.js'

const route = express.Router();

route.delete('/delete/:id', middlewareAuth.verifyToken, wishlistController.delete);

route.post('/create/store', middlewareAuth.verifyToken, wishlistController.create);

route.get('/', wishlistController.wishlist);

export default route