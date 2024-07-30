import express from 'express';
import authController from '../app/controller/accountController.js';
import middlewareAuth from '../middleware/middlewareAuth.js';


const route = express.Router();

route.patch("/submitChangePassword", middlewareAuth.verifyToken ,authController.changePasswordAccount);

route.get("/checkPassword/:id", middlewareAuth.verifyToken, authController.verifyChangePasswordAccount);

route.patch("/accountForget/recover", middlewareAuth.verifyEmail ,authController.recoverPassword);

route.get("/accountForget", authController.sendEmail);

route.post("/create/store", authController.store);

route.delete("/delete", middlewareAuth.verifyToken, middlewareAuth.verifyAdminAuth(["member"]), authController.delete);

route.post("/logout", middlewareAuth.verifyToken, authController.logoutAccount);

route.post("/login", authController.loginAccount);

route.post("/refresh", authController.refresh);

route.get("/", authController.account);

export default route