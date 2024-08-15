import express from 'express';
import accountController from '../app/controller/accountController.js';
import middlewareAuth from '../middleware/middlewareAuth.js';


const route = express.Router();

route.patch("/submitChangePassword", middlewareAuth.verifyToken ,accountController.changePasswordAccount);

route.get("/checkPassword/:id", middlewareAuth.verifyToken, accountController.verifyChangePasswordAccount);

route.patch("/accountForget/recover", middlewareAuth.verifyEmail ,accountController.recoverPassword);

route.get("/accountForget", accountController.sendEmail);

route.post("/create/store", accountController.store);

route.get("/register", accountController.register);

route.post("/verifyOtpRegister", accountController.verifyOtpRegister);

route.delete("/delete", middlewareAuth.verifyToken, middlewareAuth.verifyAdminAuth(["member"]), accountController.delete);

route.post("/logout", middlewareAuth.verifyToken, accountController.logoutAccount);

route.post("/login", accountController.loginAccount);

route.post("/refresh", accountController.refresh);

route.get("/", accountController.account);

export default route