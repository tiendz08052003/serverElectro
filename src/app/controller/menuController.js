import Menu from "../model/menu.js";
import utils from "../../utils/index.js";
import * as selectionServices from "../../Services/selectionServices.js"
import * as menuServices from "../../Services/menuServices.js"

const menuController = {
    //[GET] /menu
    getMenu: (req, res, next) => {
        Menu.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[GET] /menu/create
    create: (req, res, next) => {
        const fetchAPI = async () => {
            const data = await selectionServices.getSelection();
            res.render("menu/create", {data});
        }

        fetchAPI();
    },

    //[GET] /menu/create/store
    store: (req, res, next) => {
        const data = new Menu(req.body);
        data.save()
            .then( ()=> {
                res.redirect('/api/menu/create')
            })
            .catch(next);
    },

    
    //[get] /menu/list
    list: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await menuServices.getMenu();
            const data = x.filter(y => y.deleted === false) 
            console.log(data);
            res.render("menu/list", {data})
        }
        fetchAPI();
    },

    //[get] /menu/trash
    trash: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await menuServices.getMenu();
            const data = x.filter(y => y.deleted === true);
            res.render("menu/trash", {data})
        }
        fetchAPI();
    },

    //[delete] /menu/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Menu.delete(object)
            .then(() => {
                res.redirect("/api/menu/list");
            })
            .catch(next)
    },

    //[patch] /menu/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Menu.restore(object)
            .then(() => {
                res.redirect("/api/menu/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        Menu.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/menu/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deletemenusForever/:id
    deleteMenusForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Menu.deleteMany(object)
            .then(() => {
                res.redirect("/api/menu/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        Menu.find({_id: req.params.id})
            .then((data) => {
                res.render("menu/update", {data: data[0]});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        Menu.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/menu/list");
            })
            .catch(next)
    }

}

export default menuController;