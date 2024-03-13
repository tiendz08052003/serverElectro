import express from 'express';
import menuController from '../app/controller/menuController.js';

const route = express.Router();

route.delete("/trash/deleteMenusForever/:id", menuController.deleteMenusForever);

route.delete("/trash/delete/:id", menuController.deleteForever);

route.patch("/trash/restore/:id", menuController.restore);

route.delete("/list/delete/:id", menuController.delete);

route.post("/create/store", menuController.store);

route.put("/update/:id", menuController.update);

route.get("/edit/:id", menuController.edit);

route.get("/trash", menuController.trash);

route.get("/list", menuController.list);

route.get("/create", menuController.create)

route.get("/", menuController.getMenu)

export default route;