import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailServices from "../../Services/mailerServices.js";
import Account from "../model/account.model.js";
import Storage from "../model/storage.model.js";

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
            admin: data.admin, 
            role: data.role
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "10m" }
        )
    ),

    signRefreshToken: (data) =>(
        jwt.sign({
            _id: data._id,
            admin: data.admin, 
            role: data.role
        },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "360d" }
        )
    ),

    // [Post] /account/login
    loginAccount: async (req, res, next) => {
        try {
            let errors = [];
            let {email, password} = req.body;
            // Trim email and password directly
            email = email.trim();
            password = password.trim();
            if(!email) errors.push({email: "email is invalid"});
            if(!password) errors.push({email: "password is invalid"});
            if(errors.length != 0) {
                const err = new validate(errors);
                err.status = 422;
                next(err);
                return;
            }
            const data = await Account.findOne({email: req.body.email})
            bcrypt.compare(req.body.password, data.password, async (err, result) => {
                if(err){
                    const error = new Error('Password error')
                    error.status = 401;
                    next(error);
                    return;
                }
                if(!result) {
                    const error = new Error('Passwords are not duplicates')
                    error.status = 403;
                    next(error);
                    return;
                } 
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
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
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
                        role: req.body.role
                    });
                    try {
                        const data = await account.save();
                        await sendMailServices(data.email, "Cảm ơn bạn đã thêm tài khoản ELECTRO 👻", "<b>Thank you for registering an account Electro</b>")
                        console.log(a)
                        res.status(200).json("Success");
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
        Account.findByIdAndDelete({_id: req.user._id})
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
        if(!refreshToken) {
            const err = new Error("Error not refreshToken!");
            err.status = 401;
            next(err);
            return ;
        }
        else if(!listRefreshToken.includes(refreshToken)){
            const err = new Error("Error refreshToken not includes!");
            err.status = 403;
            next(err);
            return;
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, data) => {
            if(err) {
                const error = new Error("Error refreshToken duplicate!");
                error.status = 401;
                next(error);
                return;
            } 
            try {
                await Storage.deleteOne({refreshToken})
                const newAccessToken = accountController.signAccessToken(data);
                const newRefreshToken = accountController.signRefreshToken(data);
                const storage = new Storage({refreshToken: newRefreshToken});
                await storage.save();
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                });
                res.status(200).json({accessToken: newAccessToken});
            } catch (error) {
                const err = new Error("Error not found!");
                err.status = 404;
                next(err);
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
            const err = new Error("Error");
            err.status = 404;
            next(err);
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
                        res.status(200).json("Success");
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
                    if(err) return res.status(404).json("Error");
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
                res.status(400).json("Error");
            })    
    },

    verifyChangePasswordAccount: (req, res, next) => {
        Account.findOne({_id: req.params.id})
            .then((data) => {
                bcrypt.compare(req.headers.password, data.password, (err, result) => {
                    if(err) return res.status(404).json("Error");
                    if(!result) return res.status(404).json("No duplicate");
                    res.status(200).json("Success");
                })
            })
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