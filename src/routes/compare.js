import express from 'express';
import compareController from '../app/controller/compareController.js';

const route = express.Router();

route.patch('/update/:id/:count', compareController.update);

route.delete('/delete/:id', compareController.delete);

route.post('/create/store', compareController.store);

route.get('/', compareController.compare);

export default route