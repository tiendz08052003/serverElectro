import Color from "../model/color.model.js";
import utils from "../../utils/index.js";

const colorController = {
    //[get] /color
    color: (req, res, next) => {
        Color.find()
            .then(data => {
                res.json(data);
            })
            .catch(next)
    },

    //[create] /color/create
    create: (req, res, next) => {
      res.render('color/create');  
    },

    //[post] /color/create/store
    store: (req, res, next) => {
        const data = new Color(req.body);
        data.save()
            .then(() => {
                res.redirect('/api/color/create');
            })
            .catch(next)
    },

    
    //[get] /color/list
    list: async (req, res, next) => {
        try {
            const x = await Color.find();
            const data = x.filter(y => y.deleted === false) 
            res.render("color/list", {data})
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[get] /color/trash
    trash: async (req, res, next) => {
        try {
            const x = await Color.find();
            const data = x.filter(y => y.deleted === true);
            res.render("color/trash", {data})
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[delete] /color/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Color.delete(object)
            .then(() => {
                res.redirect("/api/color/list");
            })
            .catch(next)
    },

    //[patch] /color/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Color.restore(object)
            .then(() => {
                res.redirect("/api/color/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        Color.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/color/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deletecolorsForever/:id
    deleteColorsForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Color.deleteMany(object)
            .then(() => {
                res.redirect("/api/color/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        Color.find({_id: req.params.id})
            .then((data) => {
                res.render("color/update", {data: data[0]});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        Color.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/color/list");
            })
            .catch(next)
    }


}

export default colorController;