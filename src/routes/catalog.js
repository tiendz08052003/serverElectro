import express from 'express';
import catalogController from '../app/controller/catalogController.js';

const route = express.Router();

route.post("/create/store", catalogController.store)

route.get("/create", catalogController.create)

route.get("/", catalogController.getCatalog)

export default route;