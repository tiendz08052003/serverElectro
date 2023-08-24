import express from 'express';
import menuController from '../app/controller/menuController.js';

const route = express.Router();

route.post("/create/store", menuController.store)

route.get("/create", menuController.create)

route.get("/", menuController.getMenu)

export default route;