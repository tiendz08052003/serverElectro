import Type from "../model/Type.js";
import utils from "../../utils/index.js";
import * as selectionServices from "../../Services/selectionServices.js"
import * as typeServices from "../../Services/typeServices.js"

const typeController = {
    //[GET] /type
    defaultType: (req, res, next) => {
        Type.find()
            .then((data) => {
                res.json(data)
            })
            .catch(next)
    },

    //[GET] /type/create
    create: (req, res, next) => {
        let data;
        const fetchAPI = async () => {
            data = await selectionServices.getSelection();
            res.render("type/create", {data});
        }
        fetchAPI();
    },

    //[POST] /type/create/store
    store: (req, res, next) => {
        const data = new Type(req.body);
        data.save()
            .then(() => {
                res.redirect('/api/type/create')
            })
            .catch(next)
    },

    
    //[get] /type/list
    list: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await typeServices.getType();
            const data = x.filter(y => y.deleted === false) 
            console.log(data);
            res.render("type/list", {data})
        }
        fetchAPI();
    },

    //[get] /type/trash
    trash: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await typeServices.getType();
            const data = x.filter(y => y.deleted === true);
            res.render("type/trash", {data})
        }
        fetchAPI();
    },

    //[delete] /type/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Type.delete(object)
            .then(() => {
                res.redirect("/api/type/list");
            })
            .catch(next)
    },

    //[patch] /type/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Type.restore(object)
            .then(() => {
                res.redirect("/api/type/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        Type.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/type/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deletetypesForever/:id
    deleteTypesForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Type.deleteMany(object)
            .then(() => {
                res.redirect("/api/type/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        Type.find({_id: req.params.id})
            .then((data) => {
                res.render("type/update", {data: data[0]});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        Type.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/type/list");
            })
            .catch(next)
    }

}

export default typeController;