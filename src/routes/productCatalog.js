import express from 'express'
import productCatalogController from '../app/controller/productCatalogController.js'

const route = express.Router();

route.post("/create/store", productCatalogController.store);

route.get("/create", productCatalogController.create);

route.get("/", productCatalogController.getProductCatalog);



export default route