import Color from "../model/color.js";
import utils from "../../utils/index.js";
import * as colorServices from "../../Services/colorServices.js"

const colorController = {
    //[get] /color
    listColor: (req, res, next) => {
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
    list: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await colorServices.getColor();
            const data = x.filter(y => y.deleted === false) 
            console.log(data);
            res.render("color/list", {data})
        }
        fetchAPI();
    },

    //[get] /color/trash
    trash: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await colorServices.getColor();
            const data = x.filter(y => y.deleted === true);
            res.render("color/trash", {data})
        }
        fetchAPI();
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