import express from 'express';
import catalogController from '../app/controller/catalogController.js';

const route = express.Router();
route.delete("/trash/deleteCatalogsForever/:id", catalogController.deleteCatalogsForever);

route.delete("/trash/delete/:id", catalogController.deleteForever);

route.patch("/trash/restore/:id", catalogController.restore);

route.delete("/list/delete/:id", catalogController.delete);

route.post("/create/store", catalogController.store)

route.patch("/update/:id", catalogController.update);

route.get("/edit/:id", catalogController.edit);

route.get("/trash", catalogController.trash);

route.get("/list", catalogController.list);

route.get("/create", catalogController.create)

route.get("/", catalogController.catalog)

export default route;