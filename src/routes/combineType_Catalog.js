import express from "express";
import combineType_CatalogController from "../app/controller/combineType_CatalogController.js";

const route = express.Router();

route.post("/create/store", combineType_CatalogController.store);

route.get("/create", combineType_CatalogController.create);

route.get("/edit/:id", combineType_CatalogController.edit);

route.get("/list", combineType_CatalogController.list);

route.get("/", combineType_CatalogController.combineType_Catalog);

export default route;