import Type from "../model/type.js";
import utils from "../../utils/index.js";
import * as selectionServices from "../../Services/selectionServices.js"

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
}

export default typeController;