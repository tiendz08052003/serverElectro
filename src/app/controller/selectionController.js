import Selection from "../model/selection.js";
import utils from "../../utils/index.js";

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
                res.redirect('/selection/create')
            })
            .catch(next);
    }

    
}

export default selectionController