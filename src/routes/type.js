import express from 'express'
import typeController from '../app/controller/typeController.js'

const route = express.Router();

route.post('/create/store', typeController.store);

route.get('/create', typeController.create);

route.get('/', typeController.defaultType);

export default route;