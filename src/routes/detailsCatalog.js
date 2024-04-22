import express from 'express'
import detailsCatalogController from '../app/controller/detailsCatalogController.js'

const route = express.Router();

route.delete("/trash/deleteDetailsTypeForever/:id", detailsCatalogController.deleteDetailsCatalogsForever);

route.delete("/trash/delete/:id", detailsCatalogController.deleteForever);

route.patch("/trash/restore/:id", detailsCatalogController.restore);

route.delete("/list/delete/:id", detailsCatalogController.delete);

route.post('/create/store', detailsCatalogController.store);

route.patch("/update/:id", detailsCatalogController.update);

route.get("/edit/:id", detailsCatalogController.edit);

route.get("/trash", detailsCatalogController.trash);

route.get("/list", detailsCatalogController.list);

route.get('/create', detailsCatalogController.create);

route.get('/', detailsCatalogController.detailsCatalog);

export default route;