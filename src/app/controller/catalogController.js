import Catalog from "../model/catalog.js";
import utils from "../../utils/index.js";
import * as menuServices from "../../Services/menuServices.js"
import * as catalogServices from "../../Services/catalogServices.js"
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

    
    //[get] /catalog/list
    list: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await catalogServices.getCatalog();
            const data = x.filter(y => y.deleted === false) 
            console.log(data);
            res.render("catalog/list", {data})
        }
        fetchAPI();
    },

    //[get] /catalog/trash
    trash: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await catalogServices.getCatalog();
            const data = x.filter(y => y.deleted === true);
            res.render("catalog/trash", {data})
        }
        fetchAPI();
    },

    //[delete] /catalog/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Catalog.delete(object)
            .then(() => {
                res.redirect("/api/catalog/list");
            })
            .catch(next)
    },

    //[patch] /catalog/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Catalog.restore(object)
            .then(() => {
                res.redirect("/api/catalog/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        Catalog.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/catalog/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deletecatalogsForever/:id
    deleteCatalogsForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Catalog.deleteMany(object)
            .then(() => {
                res.redirect("/api/catalog/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        Catalog.find({_id: req.params.id})
            .then((data) => {
                res.render("catalog/update", {data: data[0]});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        Catalog.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/catalog/list");
            })
            .catch(next)
    }

}

export default catalogController;