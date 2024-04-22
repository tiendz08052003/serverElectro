import express from 'express';
import chatController from '../app/controller/chatController.js';
const route = express.Router();

route.patch("/replace/:id", chatController.replace)

route.delete("/delete/:id", chatController.delete)

route.post("/create", chatController.create)

route.patch("/update/:id", chatController.update)

route.get("/", chatController.chat)

export default route;