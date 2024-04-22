import express from 'express'
import typeController from '../app/controller/typeController.js'

const route = express.Router();

route.delete("/trash/deleteTypeForever/:id", typeController.deleteTypeForever);

route.delete("/trash/delete/:id", typeController.deleteForever);

route.patch("/trash/restore/:id", typeController.restore);

route.delete("/list/delete/:id", typeController.delete);

route.post('/create/store', typeController.store);

route.patch("/update/:id", typeController.update);

route.get("/edit/:id", typeController.edit);

route.get("/trash", typeController.trash);

route.get("/list", typeController.list);

route.get('/create', typeController.create);

route.get('/', typeController.type);

export default route;