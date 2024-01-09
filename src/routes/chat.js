import express from 'express';
import chatController from '../app/controller/chatController.js';
const route = express.Router();

route.put("/replace/:id", chatController.replace)

route.delete("/delete/:id", chatController.delete)

route.post("/create", chatController.create)

route.patch("/update/:id", chatController.update)

route.get("/", chatController.getChat)

export default route;