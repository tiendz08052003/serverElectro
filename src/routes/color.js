import express from 'express';
import colorController from '../app/controller/colorController.js';


const route = express.Router();

route.delete("/trash/deleteColorsForever/:id", colorController.deleteColorsForever);

route.delete("/trash/delete/:id", colorController.deleteForever);

route.patch("/trash/restore/:id", colorController.restore);

route.delete("/list/delete/:id", colorController.delete);

route.post("/create/store", colorController.store);

route.patch("/update/:id", colorController.update);

route.get("/edit/:id", colorController.edit);

route.get("/trash", colorController.trash);

route.get("/list", colorController.list);

route.get("/create", colorController.create);

route.get("/", colorController.color);

export default route;

