import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailServices from "../../Services/mailerServices.js";
import Account from "../model/account.js";
import Storage from "../model/storage.js";

const accountController = {
    // [Get] /account
    account: (req, res, next) => {
        Account.find()
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

    // [Post] /account/login
    loginAccount: async (req, res, next) => {
        try {
            const data = await Account.findOne({email: req.body.email})
            bcrypt.compare(req.body.password, data.password, async (err, result) => {
                if(err) return res.status(401).json("password error!!!");
                if(!result) return res.status(403).json("password duplicate!!!");
                const accessToken = accountController.signAccessToken(data);
                const refreshToken = accountController.signRefreshToken(data);
                const storage = new Storage({refreshToken: refreshToken});
                await storage.save();
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const {password, ...others} = data._doc;
                res.status(200).json({...others, accessToken});
            })
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    // [Post] /account/create/store 
    store: async (req, res, next) => {
        if(req.body.password === req.body.passwordAgain)
        {
            try {
                let hashed;
                const salt = await bcrypt.genSalt(10)
                bcrypt.hash(req.body.password, salt, async (err, result) => {
                    if(err) return res.status(401).json("Error hashed!!!");
                    hashed = result;
                    const account = new Account({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashed,
                    });
                    try {
                        const data = await account.save()
                        sendMailServices(data.email, "Cảm ơn bạn đã thêm tài khoản ELECTRO 👻", "<b>Thank you for registering an account Electro</b>")
                        res.status(200).json("Success")
                    } catch (error) {
                        res.status(401).json("Error");
                    }
                })
            } catch (error) {
                res.status(404).json("Error");
            }
        }
        else
            res.status(404).json("Error");
    },

    //[DELETE] /account/delete/:id
    delete: (req, res, next) => {
        Account.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json("Success")
            })
            .catch(() => {
                res.status(403).json("Error")
            })
    },

    //[POST] /account/refresh
    refresh: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        const result = await Storage.find();
        const listRefreshToken = result.map(x => x.refreshToken);
        if(!refreshToken) 
            return res.status(401).json("Error not refreshToken!!!");
        else if(!listRefreshToken.includes(refreshToken))
            return res.status(403).json("Error refreshToken not includes!!!");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, data) => {
            if(err) return res.status(401).json("Error refreshToken duplicate!!!");
            try {
                await Storage.deleteOne({refreshToken})
                const newAccessToken = accountController.signAccessToken(data);
                const newRefreshToken = accountController.signRefreshToken(data);
                const data = new Storage({refreshToken: newRefreshToken});
                await data.save();
                res.cookies("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });
                res.status(200).json({accessToken: newAccessToken});
            } catch (error) {
                res.status(404).json("Error");
            }
        }
        ) 
    },

    //[POST] /account/logout
    logoutAccount: async (req, res, next) => {
        try {
            await Storage.deleteOne({refreshToken: req.cookies.refreshToken})
            res.clearCookie("refreshToken");
            res.status(200).json("Success");
        } catch (error) {
            res.status(404).json("Error");
        }
    },
    
    //[GET] /account/accountForget?email=...@gmail.com
    sendEmail: async (req, res, next) => {
        try {
            const data = await Account.find();
            let listAccount = data.map(x => x.email);
            if(listAccount.includes(req.query.email))
            {
                const salt = await bcrypt.genSalt(10)
                bcrypt.hash(req.query.email, salt, async (err, result) => {
                    if(err) return res.status(401).json("Error hashed!!!");
                    try {
                        let hashed = result;
                        await sendMailServices(req.query.email, "Thay đổi mật khẩu tài khoản ELECTRO 👻",
                            `<a href="${process.env.REACT_URL}/account/accountForget?type=recoverPassword&email=${req.query.email}&hashEmail=${hashed}" >Bấm vào để lấy lại mật khẩu nhé ❤️</a>`    
                        )
                    } catch (error) {
                        res.status(404).json("Error");
                    }
                })
            }
            else 
            {
                res.status(404).json("Error");
            }
        } catch (error) {
            res.status(404).json("Error");
        }
        
    },

    //[PATCH] /account/accountForget/recover?email=...@gmail.com&hashEmail=...
    recoverPassword: (req, res, next) => {  
        let salt;
        let hashed;
        bcrypt.genSalt(10)
            .then((x) => {
                salt = x;
                bcrypt.hash(req.body.password, salt, (err, result) => {
                    if(err) res.status(404).json("Error");
                    hashed = result;
                    Account.updateOne({email: req.query.email}, {password: hashed})
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
    },

    verifyChangePasswordAccount: (req, res, next) => {
        Account.findOne({_id: req.params.id})
            .then((data) => {
                console.log(data.password, req.headers.password)
                bcrypt.compare(req.headers.password, data.password, (err, result) => {
                    if(err) res.status(404).json("Error");
                    if(!result) res.status(404).json("No duplicate");
                    res.status(200).json("Success");
                })
            }
            )
            .catch(() => {
                res.status(404).json("Error");
            })
    },

    //[PATCH] /account/submitChangePassword?id=...
    changePasswordAccount: (req, res, next) => {
        let salt;
        let hashed;
        bcrypt.genSalt(10)
            .then((x) => {
                salt = x;
                bcrypt.hash(req.body.password, salt, (err, result) => {
                    if(err) res.status(404).json("Error");
                    hashed = result;
                    Account.updateOne({_id: req.query.id}, {password: hashed})
                        .then(() => {
                            res.status(200).json("Success")
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

}

export default accountController;