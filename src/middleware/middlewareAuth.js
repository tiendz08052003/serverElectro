import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const middlewareAuth = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token)
        {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err) return res.status(401).json("Error token!!!");
                req.user = user;
                next();
            })
        }
        else
        {
            return res.status(401).json("Error not token!!!")
        }
    },

    verifyAdminAuth: (req, res, next) => {
        middlewareAuth.verifyToken(req, res, () => {
            if(!req.headers.admin)
            {
                next();
            }
            else
            {
                res.status(401).json("Error not delete!!!")
            }
        })
    },

    verifyEmail: (req, res, next) => {
        bcrypt.compare(req.query.email, req.query.hashEmail, (err, result) => {
            if(err) return res.status(401).json("email error!!!");
            next();
        })
    }
}

export default middlewareAuth;