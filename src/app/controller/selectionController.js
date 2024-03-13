import Selection from "../model/selection.js";
import utils from "../../utils/index.js";
import * as selectionServices from "../../Services/selectionServices.js"

const selectionController = {
    //[GET] /selection
    defaultSelection: (req, res, next) => {
        Selection.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[GET] /selection/create
    create: (req, res, next) => {
        res.render('selection/create');
    },

    //[POST] /selection/create/store
    store: (req, res, next) => {
        const data = new Selection(req.body)
        data.save()
            .then(() => {
                res.redirect('/api/selection/create')
            })
            .catch(next);
    },

    
    //[get] /selection/list
    list: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await selectionServices.getSelection();
            const data = x.filter(y => y.deleted === false) 
            res.render("selection/list", {data})
        }
        fetchAPI();
    },

    //[get] /selection/trash
    trash: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await selectionServices.getSelection();
            const data = x.filter(y => y.deleted === true);
            res.render("selection/trash", {data})
        }
        fetchAPI();
    },

    //[delete] /selection/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Selection.delete(object)
            .then(() => {
                res.redirect("/api/selection/list");
            })
            .catch(next)
    },

    //[patch] /selection/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Selection.restore(object)
            .then(() => {
                res.redirect("/api/selection/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        Selection.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/selection/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deleteSelectionsForever/:id
    deleteSelectionsForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Selection.deleteMany(object)
            .then(() => {
                res.redirect("/api/selection/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        Selection.find({_id: req.params.id})
            .then((data) => {
                res.render("selection/update", {data: data[0]});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        Selection.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/selection/list");
            })
            .catch(next)
    }
}

export default selectionController