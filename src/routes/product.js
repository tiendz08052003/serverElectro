import express from 'express'
import productController from '../app/controller/productController.js';
import elasticsearchController from '../app/controller/elasticsearch.controller.js';

const route = express.Router();

route.get('/elasticsearch/searchElasticsearch', elasticsearchController.search);

route.post('/elasticsearch/synchronized', elasticsearchController.synchronizedData);

route.delete('/trash/permanentlyDeleted/:id', productController.permanentlyDeleted);

route.delete('/trash/delete/:id', productController.deleteForever);

route.patch('/trash/restore/:id', productController.restore);

route.patch('/update/:id', productController.update);

route.get('/edit/:id', productController.edit);

route.delete('/list/delete/:id', productController.delete);

route.post('/create/store', productController.store);

route.get('/create', productController.create);

route.get('/search', productController.search); 

route.get('/list', productController.list);

route.get('/trash', productController.trash);

route.get('/', productController.product)

export default route;
