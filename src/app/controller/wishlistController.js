import Wishlist from "../model/wishlist.model.js";
import utils from "../../utils/index.js";

const wishlistController = {
    //[GET] /wishlist
    wishlist:(req, res, next) => {
        Wishlist.find()
            .then(result => {
                res.json(result);
            })
            .catch(next)
    },
    
    //[POST] /wishlist/create/store
    create: (req, res, next) => {
        const result = new Wishlist(req.body);
        result.save()
            .then((result) => {
                res.json(result);
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