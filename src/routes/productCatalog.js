import express from 'express'
import productCatalogController from '../app/controller/productCatalogController.js'

const route = express.Router();

route.delete("/trash/deleteProductCatalogsForever/:id", productCatalogController.deleteProductCatalogsForever);

route.delete("/trash/delete/:id", productCatalogController.deleteForever);

route.patch("/trash/restore/:id", productCatalogController.restore);

route.delete("/list/delete/:id", productCatalogController.delete);

route.post("/create/store", productCatalogController.store);

route.put("/update/:id", productCatalogController.update);

route.get("/edit/:id", productCatalogController.edit);

route.get("/trash", productCatalogController.trash);

route.get("/list", productCatalogController.list);

route.get("/create", productCatalogController.create);

route.get("/", productCatalogController.getProductCatalog);



export default route