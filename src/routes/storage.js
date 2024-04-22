import express from "express"
import storageController from "../app/controller/storageController.js";

const route = express.Router();

route.post("/create/store", storageController.store);

route.delete("/delete/:id", storageController.delete);

route.get("/", storageController.storage);

export default route;
