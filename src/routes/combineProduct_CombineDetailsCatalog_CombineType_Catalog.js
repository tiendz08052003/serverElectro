import express from 'express';
import combineProduct_CombineDetailsCatalog_CombineType_CatalogController from '../app/controller/combineProduct_CombineDetailsCatalog_CombineType_CatalogController.js';

const route = express.Router();


route.delete('/trash/permanentlyDeleted/:id', combineProduct_CombineDetailsCatalog_CombineType_CatalogController.permanentlyDeleted);

route.delete("/list/delete/:id", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.softDelete);

route.post("/create/store", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.store);

route.patch("/trash/restore/:id", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.restore);

route.get("/trash", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.trash);

route.get("/create", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.create)

route.get("/list", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.list)

route.get("/", combineProduct_CombineDetailsCatalog_CombineType_CatalogController.combineProduct_CombineDetailsCatalog_CombineType_Catalog)

export default route;