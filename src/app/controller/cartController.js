import Cart from "../model/cart.js";
import utils from "../../utils/index.js";

const cartController = {
    //[GET] /cart
    list:(req, res, next) => {
        Cart.find()
            .then(datas => {
                res.json(datas);
            })
            .catch(next)
    },
    
    //[POST] /cart/create
    create: (req, res, next) => {
        const data = new Cart(req.body);
        data.save()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[PATCH] /cart/update/:id?/:count?
    update: (req, res, next) => {
        Cart.findByIdAndUpdate({_id: req.params.id}, {count: Number(req.params.count)})
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[DELETE] /cart/delete/:id
        delete: (req, res, next) => {
        Cart.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json("Success");
            })
            .catch(() => {
                res.status(404).json("Error");
            })
    }
}

export default cartController;