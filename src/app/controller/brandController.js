import Brand from "../model/brand.js";
import utils from "../../utils/index.js";

const brandController = {
    //[get] /brand
    listBrand: (req, res, next) => {
        Brand.find()
            .then(data => {
                res.json(data);
            })
            .catch(next)
    },

    //[create] /brand/create
    create: (req, res, next) => {
      res.render('brand/create');  
    },

    //[create] /brand/create/store
    store: (req, res, next) => {
        const data = new Brand(req.body);
        data.save()
            .then(() => {
                res.redirect('/brand/create');
            })
            .catch(next)
    }

}

export default brandController;