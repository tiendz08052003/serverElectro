import Auth from "../model/auth.js";
import utils from "../../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailServices from "../../Services/mailerServices.js";
import * as storageServices from "../../Services/storageServices.js"
import * as authServices from "../../Services/authServices.js"


const authController = {
    // [Get] /auth
    getAuth: (req, res, next) => {
        Auth.find()
            .then(data => {
                res.json(data);
            })
            .catch(next)
    },

    signAccessToken: (data) => (
        jwt.sign({
            _id: data._id,
            admin: data.admin
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "10m" }
        )
    ),

    signRefreshToken: (data) =>(
        jwt.sign({
            _id: data._id,
            admin: data.admin
        },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "360d" }
        )
    ),

    // [Post] /auth/login
    loginAuth: (req, res, next) => {
        Auth.findOne({email: req.body.email})
            .then((data) => {
                bcrypt.compare(req.body.password, data.password, (err, result) => {
                    if(err) return res.status(401).json("password error!!!");
                    if(!result) return res.status(403).json("password duplicate!!!");
                    const accessToken = authController.signAccessToken(data);
                    const refreshToken = authController.signRefreshToken(data);
                    storageServices.postStorage({refreshToken: refreshToken})
                        .then(() => {
                            res.cookie("refreshToken", refreshToken, {
                                httpOnly: true,
                                secure: false,
                                path: "/",
                                sameSite: "strict",
                            });
                            const {password, ...others} = data._doc;
                            res.status(200).json({...others, accessToken});
                        })
                        .catch(() => {
                            res.status(404).json("Error");
                        })
                })
            })
            .catch(() => {
                res.status(401).json("Error")
            })
    },

    // [Post] /auth/create/store 
    store: (req, res, next) => {
        if(req.body.password === req.body.passwordAgain)
        {
            let salt;
            let hashed;
            bcrypt.genSalt(10)
                .then((x) => {
                    salt = x;
                    bcrypt.hash(req.body.password, salt, (err, result) => {
                        if(err) return res.status(401).json("Error hashed!!!");
                        hashed = result;
                        const data = new Auth({
                            userName: req.body.userName,
                            email: req.body.email,
                            password: hashed,
                        });
                        data.save()
                            .then((data) => {
                                sendMailServices(data.email, "Cảm ơn bạn đã thêm tài khoản ELECTRO 👻", "<b>Thank you for registering an account Electro</b>")
                                    .then(() => {
                                        res.status(200).json("Success")
                                    })
                                    .catch(() => {
                                        res.status(404).json("Error");
                                    })
                            })
                            .catch((err) => {
                                res.status(401).json("Error")
                            })
                    })
                })
                .catch((err) => {
                    res.status(401).json("Error")
                }) 
        }
        else
            res.status(401).json("Error");
    },

    //[DELETE] /auth/delete/:id
    delete: (req, res, next) => {
        Auth.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json("Success")
            })
            .catch(() => {
                res.status(403).json("Error")
            })
    },

    //[POST] /auth/refresh
    refresh: (req, res, next) => { 
        console.log(req.cookies.refreshToken)
        const refreshToken = req.cookies.refreshToken;
        storageServices.getStorage()
            .then((result) => {
                const listRefreshToken = result.map(x => x.refreshToken);
                if(!refreshToken) 
                    return res.status(401).json("Error not refreshToken!!!");
                else if(!listRefreshToken.includes(refreshToken))
                    return res.status(403).json("Error refreshToken not includes!!!");
                jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
                    if(err) return res.status(401).json("Error refreshToken duplicate!!!");
                    storageServices.deleteStorage(refreshToken)
                        .then(() => {
                            const newAccessToken = authController.signAccessToken(data);
                            const newRefreshToken = authController.signRefreshToken(data);
                            storageServices.postStorage({refreshToken: newRefreshToken})
                                .then(() => {
                                    res.cookie("refreshToken", newRefreshToken, {
                                        httpOnly: true,
                                        secure: false,
                                        path: "/",
                                        sameSite: "strict"
                                    });
                                    res.status(200).json({accessToken: newAccessToken});
                                })
                                .catch(() => {
                                    res.status(404).json("Error");
                                })
                        })
                        .catch(() => {
                            res.status(404).json("Error");
                        })
                    }
                ) 
            })
            .catch(() => {
                res.status(404).json("Error");
            })
    },

    //[POST] /auth/logout
    logoutAuth: (req, res, next) => {
        storageServices.deleteStorage(req.cookies.refreshToken)
            .then(() => {
                res.clearCookie("refreshToken");
                res.status(200).json("Success");
            })
            .catch(() => {
                res.status(401).json("Error");
            })
    },
    
    //[GET] /auth/accountForget?email=...@gmail.com
    sendEmail: (req, res, next) => {
        let salt;
        let hashed;
        authServices.getAuth()
            .then((data) => {
                let listAuth = data.map(x => x.email);
                if(listAuth.includes(req.query.email))
                {
                    bcrypt.genSalt(10)
                        .then((x) => {
                            salt = x;
                            bcrypt.hash(req.query.email, salt, (err, result) => {
                                if(err) return res.status(401).json("Error hashed!!!");
                                hashed = result
                                sendMailServices(req.query.email, "Thay đổi mật khẩu tài khoản ELECTRO 👻",
                                    `<a href="${process.env.REACT_URL}/account/accountForget?type=recoverPassword&email=${req.query.email}&hashEmail=${hashed}" >Bấm vào để lấy lại mật khẩu nhé ❤️</a>`    
                                )
                                    .then(() => {
                                        res.status(200).json("Success!")
                                    })
                                    .catch((err) => {
                                        res.status(404).json("Error");
                                    })
                            })
                        })
                        .catch(() => {
                            res.status(404).json("Error");
                        })
                }
                else 
                {
                    res.status(404).json("Error");
                }
            })
            .catch(() => {
                res.status(404).json("Error");
            })
        
    },

    //[PATCH] /auth/accountForget/recover?email=...@gmail.com&hashEmail=...
    recoverPassword: (req, res, next) => {  
        let salt;
        let hashed;
        bcrypt.genSalt(10)
            .then((x) => {
                salt = x;
                bcrypt.hash(req.body.password, salt, (err, result) => {
                    if(err) res.status(404).json("Error");
                    hashed = result;
                    Auth.updateOne({email: req.query.email}, {password: hashed})
                        .then(() => {
                            res.status(200).json("Success")
                        })
                        .catch((err) => {
                            res.status(404).json("Error");
                        })
                })
            })
            .catch(() => {

            })
        
    }
}

export default authController;