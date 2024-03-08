import Catalog from "../model/catalog.js";
import utils from "../../utils/index.js";
import * as menuServices from "../../Services/menuServices.js"
import * as selectionServices from "../../Services/selectionServices.js"

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
        let listMenu, listSelection;
        const fetchAPI = async () => {
            const data = await menuServices.getMenu();
            listMenu = data;
            data = await selectionServices.getSelection();
            listSelection = data;
            res.render("catalog/create", {listMenu, listSelection});
        }

        fetchAPI();
    },

    //[GET] /catalog/create/store
    store: (req, res, next) => {
        const data = new Catalog(req.body);
        data.save()
            .then( ()=> {
                res.redirect('/api/catalog/create')
            })
            .catch(next);
    },
}

export default catalogController;