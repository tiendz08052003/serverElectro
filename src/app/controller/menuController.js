import Menu from "../model/menu.js";
import utils from "../../utils/index.js";
import * as selectionServices from "../../Services/selectionServices.js"

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
                res.redirect('/menu/create')
            })
            .catch(next);
    },
}

export default menuController;