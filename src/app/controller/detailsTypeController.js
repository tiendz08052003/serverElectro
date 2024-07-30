import DetailsType from "../model/detailsType.model.js";
import utils from "../../utils/index.js";
import Type from "../model/type.model.js";

const detailsTypeController = {
    //[GET] /type
    detailsType: (req, res, next) => {
        DetailsType.find()
            .then((data) => {
                res.json(data)
            })
            .catch(next)
    },

    //[GET] /detailsType/create
    create: async (req, res, next) => {
        try {
            const data = await Type.find();
            res.render("detailsType/create", {data});
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[POST] /detailsType/create/store
    store: (req, res, next) => {
        const data = new DetailsType(req.body);
        data.save()
            .then(() => {
                res.redirect('/api/detailsType/create')
            })
            .catch(next)
    },

    
    //[get] /detailsType/list
    list: async (req, res, next) => {
        try {
            const data = await DetailsType.find();
            const dataType = await Type.find();
            res.render("detailsType/list", {data, dataType});
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[get] /detailsType/trash
    trash: async (req, res, next) => {
        try {
            const x = await Type.find();
            const data = x.filter(y => y.deleted === true);
            res.render("detailsType/trash", {data})
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[delete] /detailsType/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        DetailsType.delete(object)
            .then(() => {
                res.redirect("/api/detailsType/list");
            })
            .catch(next)
    },

    //[patch] /detailsType/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        DetailsType.restore(object)
            .then(() => {
                res.redirect("/api/detailsType/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        DetailsType.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/detailsType/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deleteDetailsTypeForever/:id
    deleteDetailsTypeForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        DetailsType.deleteMany(object)
            .then(() => {
                res.redirect("/api/detailsType/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: async (req, res, next) => {
        try {
            const listType = await Type.find();
            const singleData = data;
            res.render("detailsType/update", {singleData, listType});
        } catch (error) {
            res.status(404).json("Error");
        }
        
           
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        DetailsType.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/detailsType/list");
            })
            .catch(next)
    }

}

export default detailsTypeController;