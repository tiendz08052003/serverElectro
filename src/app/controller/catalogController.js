import Catalog from "../model/catalog.js";
import utils from "../../utils/index.js";

const catalogController = {
    //[GET] /catalog
    catalog: (req, res, next) => {
        Catalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[GET] /catalog/create
    create: (req, res, next) => {
        res.render("catalog/create");
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
    list: async (req, res, next) => {
        try {
            const x = await Catalog.find();
            const data = x.filter(y => y.deleted === false) 
            res.render("catalog/list", {data})
        } catch (error) {
            res.status(404).json("Error");
        }    
    },

    //[get] /catalog/trash
    trash: async (req, res, next) => {
        try {
            const x = await Catalog.find();
            const data = x.filter(y => y.deleted === true);
            res.render("catalog/trash", {data}) 
        } catch (error) {
            res.status(404).json("Error");
        }
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