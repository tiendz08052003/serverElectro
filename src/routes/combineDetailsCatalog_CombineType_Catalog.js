import express from 'express';
import combineDetailsCatalog_CombineType_CatalogController from '../app/controller/combineDetailsCatalog_CombineType_CatalogController.js';

const route = express.Router();

route.post("/create/store", combineDetailsCatalog_CombineType_CatalogController.store);

route.get("/create", combineDetailsCatalog_CombineType_CatalogController.create)

route.get("/list", combineDetailsCatalog_CombineType_CatalogController.list)

route.get("/", combineDetailsCatalog_CombineType_CatalogController.combineDetailsCatalog_CombineType_Catalog)

export default route;