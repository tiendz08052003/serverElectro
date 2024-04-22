import DetailsCatalog from "../model/detailsCatalog.js";
import utils from "../../utils/index.js";

const detailsCatalogController = {
    //[GET] /detailsCatalog
    detailsCatalog: (req, res, next) => {
        DetailsCatalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[GET] /detailsCatalog/create
    create: async (req, res, next) => {
        res.render("detailsCatalog/create");
    },

    //[GET] /detailsCatalog/create/store
    store: (req, res, next) => {
        const data = new DetailsCatalog(req.body);
        data.save()
            .then( ()=> {
                res.redirect('/api/detailsCatalog/create')
            })
            .catch(next);
    },

    
    //[get] /detailsCatalog/list
    list: async (req, res, next) => {
        try {
            const dataDetailsCatalog =  await DetailsCatalog.find()
            console.log(dataDetailsCatalog);
            res.render("detailsCatalog/list", {dataDetailsCatalog})
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[get] /detailsCatalog/trash
    trash: (req, res, next) => {
        const x = DetailsCatalog.find();
        const data = x.filter(y => y.deleted === true);
        res.render("detailsCatalog/trash", {data})
    },

    //[delete] /detailsCatalog/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        DetailsCatalog.delete(object)
            .then(() => {
                res.redirect("/api/detailsCatalog/list");
            })
            .catch(next)
    },

    //[patch] /detailsCatalog/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        DetailsCatalog.restore(object)
            .then(() => {
                res.redirect("/api/detailsCatalog/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        DetailsCatalog.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/detailsCatalog/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deleteDetailsCatalogsForever/:id
    deleteDetailsCatalogsForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        DetailsCatalog.deleteMany(object)
            .then(() => {
                res.redirect("/api/detailsCatalog/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        DetailsCatalog.findOne({_id: req.params.id})
            .then((data) => {
                res.render("detailsCatalog/update", {singleData: data});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        DetailsCatalog.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/detailsCatalog/list");
            })
            .catch(next)
    }

}

export default detailsCatalogController;