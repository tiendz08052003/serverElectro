import express from 'express';
import brandController from '../app/controller/brandController.js';

const route = express.Router();

route.post("/create/store", brandController.store);

route.get("/create", brandController.create);

route.get("/", brandController.listBrand);

export default route;

