import Type from "../model/type.model.js";

const typeController = {
    //[GET] /type
    type: (req, res, next) => {
        Type.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[GET] /type/create
    create: (req, res, next) => {
        res.render('type/create');
    },

    //[POST] /type/create/store
    store: (req, res, next) => {
        const data = new Type(req.body)
        data.save()
            .then(() => {
                res.redirect('/api/type/create')
            })
            .catch(next);
    },

    
    //[get] /type/list
    list: async (req, res, next) => {
        const x = await Type.find();
        const data = x.filter(y => y.deleted === false) 
        res.render("type/list", {data})
    },

    //[get] /type/trash
    trash: async (req, res, next) => {
        const x = await Type.find();
        const data = x.filter(y => y.deleted === true);
        res.render("type/trash", {data})
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
    ///[delete] trash/deleteTypeForever/:id
    deleteTypeForever: (req, res, next) => {
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

export default typeController