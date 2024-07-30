import express from 'express';
import cartController from '../app/controller/cartController.js';
import redisController from '../app/controller/redis.controller.js';
import middlewareAuth from '../middleware/middlewareAuth.js';

const route = express.Router();

route.patch('/update/:idAccount/:idProduct/:count', middlewareAuth.verifyToken, cartController.update);

route.delete('/delete/:id', middlewareAuth.verifyToken, cartController.delete);

route.patch('/deleteKeyCartRedis', redisController.delPromise);

route.patch('/deleteCartRedis', redisController.lRemPromise);

route.patch('/updateCartRedis', redisController.lSetPromise);

route.post('/createCartRedis', redisController.lPushPromise);

route.post('/cartRedis', redisController.lRangePromise);

route.post('/createMultiple', middlewareAuth.verifyToken, cartController.createMultiple);

route.post('/create', middlewareAuth.verifyToken, cartController.create);

route.get('/', cartController.cart);

export default route