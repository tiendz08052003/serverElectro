import express from 'express'
import selectionController from '../app/controller/selectionController.js'

const route = express.Router();

route.delete("/trash/deleteSelectionsForever/:id", selectionController.deleteSelectionsForever);

route.delete("/trash/delete/:id", selectionController.deleteForever);

route.patch("/trash/restore/:id", selectionController.restore);

route.delete("/list/delete/:id", selectionController.delete);

route.post('/create/store', selectionController.store);

route.put("/update/:id", selectionController.update);

route.get("/edit/:id", selectionController.edit);

route.get("/trash", selectionController.trash);

route.get("/list", selectionController.list);

route.get('/create', selectionController.create);

route.get('/', selectionController.defaultSelection);

export default route;