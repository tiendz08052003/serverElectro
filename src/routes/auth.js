import express from 'express';
import authController from '../app/controller/authController.js';
import middlewareAuth from '../middleware/middlewareAuth.js';


const route = express.Router();

route.patch("/accountForget/recover", middlewareAuth.verifyTokenAndEmail ,authController.recoverPassword);

route.get("/accountForget", authController.sendEmail);

route.post("/create/store", authController.store);

route.delete("/delete/:id", middlewareAuth.verifyTokenAndAdminAuth, authController.delete);

route.post("/logout", middlewareAuth.verifyToken, authController.logoutAuth);

route.post("/login", authController.loginAuth);

route.post("/refresh", authController.refresh);

route.get("/", authController.getAuth);

export default route