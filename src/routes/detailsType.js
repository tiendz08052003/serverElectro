import express from 'express'
import detailsTypeController from '../app/controller/detailsTypeController.js'

const route = express.Router();

route.delete("/trash/deleteDetailsTypeForever/:id", detailsTypeController.deleteDetailsTypeForever);

route.delete("/trash/delete/:id", detailsTypeController.deleteForever);

route.patch("/trash/restore/:id", detailsTypeController.restore);

route.delete("/list/delete/:id", detailsTypeController.delete);

route.post('/create/store', detailsTypeController.store);

route.patch("/update/:id", detailsTypeController.update);

route.get("/edit/:id", detailsTypeController.edit);

route.get("/trash", detailsTypeController.trash);

route.get("/list", detailsTypeController.list);

route.get('/create', detailsTypeController.create);

route.get('/', detailsTypeController.detailsType);

export default route;