import Wishlist from "../model/wishlist.js";
import utils from "../../utils/index.js";

const wishlistController = {
    //[GET] /wishlist
    list:(req, res, next) => {
        Wishlist.find()
            .then(datas => {
                res.json(datas);
            })
            .catch(next)
    },
    
    //[POST] /wishlist/create/store
    create: (req, res, next) => {
        const data = new Wishlist(req.body);
        data.save()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[DELETE] /wishlist/delete/:id
    delete: (req, res, next) => {
        Wishlist.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json("Success");
            })
            .catch(() => {
                res.status(404).json("Error");
            })
    }
}

export default wishlistController;