import express from 'express';
const route = express.Router();

route.get('/', (req, res, next) => {
    res.render("main/index");
});

export default route