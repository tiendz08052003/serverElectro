import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();

const middlewareAuth = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token)
        {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err) {
                    const err = new Error("Error token!!!");
                    err.status(401);
                    next(err);
                    return;
                } 
                req.user = user;
                next();
            })
        }
        else
        {
            return res.status(401).json("Error not token!")
        }
    },

    verifyAdminAuth: (permission) => {
        return (req, res, next) => {
            if(permission.includes(req.user.role))
                next();
            else
                res.status(401).json("I don't role!")
        }
    },

    verifyUserAuth: (permission) => {
        return (req, res, next) => {
            if(permission.includes(req.user.role))
                next();
            else
                res.status(401).json("I don't role!")
        }
    },

    verifyEmail: (req, res, next) => {
        bcrypt.compare(req.query.email, req.query.hashEmail, (err, result) => {
            if(err) return res.status(401).json("email error!!!");
            next();
        })
    }
}

export default middlewareAuth;