import Catalog from "../model/catalog.js";
import utils from "../../utils/index.js";
import * as menuServices from "../../Services/menuServices.js"

const catalogController = {
    //[GET] /catalog
    getCatalog: (req, res, next) => {
        Catalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[GET] /catalog/create
    create: (req, res, next) => {
        const fetchAPI = async () => {
            const data = await menuServices.getMenu();
            res.render("catalog/create", {data});
        }

        fetchAPI();
    },

    //[GET] /catalog/create/store
    store: (req, res, next) => {
        const data = new Catalog(req.body);
        data.save()
            .then( ()=> {
                res.redirect('/catalog/create')
            })
            .catch(next);
    },
}

export default catalogController;