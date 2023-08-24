import express from 'express'
import selectionController from '../app/controller/selectionController.js'

const route = express.Router();

route.post('/create/store', selectionController.store);

route.get('/create', selectionController.create);

route.get('/', selectionController.defaultSelection);

export default route;