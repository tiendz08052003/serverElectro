import express from 'express';
import colorController from '../app/controller/colorController.js';


const route = express.Router();

route.post("/create/store", colorController.store);

route.get("/create", colorController.create);

route.get("/", colorController.listColor);

export default route;

