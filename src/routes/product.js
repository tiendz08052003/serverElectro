import express from 'express'
import productController from '../app/controller/productController.js';
import fileUploader from "../middleware/uploader.js" 

const route = express.Router();

route.delete('/trash/deleteProducts/:id', productController.deleteProductsForever);

route.delete('/trash/delete/:id', productController.deleteForever);

route.patch('/trash/restore/:id', productController.restore);

route.put('/update/:id', productController.update);

route.get('/edit/:id', productController.edit);

route.delete('/list/delete/:id', productController.delete);

route.post('/create/store', productController.store);

route.get('/create', productController.create);

route.get('/search', productController.search); 

route.get('/list', productController.list);

route.get('/trash', productController.trash);

route.get('/', productController.indexDefault)

export default route;
