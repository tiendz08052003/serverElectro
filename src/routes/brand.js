import express from 'express';
import brandController from '../app/controller/brandController.js';

const route = express.Router();

route.delete("/trash/deleteBrandsForever/:id", brandController.deleteBrandsForever);

route.delete("/trash/delete/:id", brandController.deleteForever);

route.patch("/trash/restore/:id", brandController.restore);

route.delete("/list/delete/:id", brandController.delete);

route.post("/create/store", brandController.store);

route.put("/update/:id", brandController.update);

route.get("/edit/:id", brandController.edit);

route.get("/trash", brandController.trash);

route.get("/list", brandController.list);

route.get("/create", brandController.create);

route.get("/", brandController.listBrand);

export default route;

