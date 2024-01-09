import Color from "../model/color.js";
import utils from "../../utils/index.js";

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
    }

}

export default colorController;