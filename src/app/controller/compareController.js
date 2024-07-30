import Compare from "../model/compare.model.js";
import utils from "../../utils/index.js";

const compareController = {
    //[GET] /compare
    compare:(req, res, next) => {
        Compare.find()
            .then(data => {
                res.json(data);
            })
            .catch(next)
    },
    
    //[POST] /compare/create/store
    store: (req, res, next) => {
        const data = new Compare(req.body);
        data.save()
            .then(() => {
                res.status(200).json("Success");
            })
            .catch(
                () => {
                    res.status(404).json("Error");
                }
            )
    },

    //[PATCH] /compare/update/:id?/:count?
    update: (req, res, next) => {
        Compare.findByIdAndUpdate({_id: req.params.id}, {count: Number(req.params.count)})
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    //[DELETE] /compare/delete/:id
        delete: (req, res, next) => {
        Compare.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json("Success");
            })
            .catch(() => {
                res.status(404).json("Error");
            })
    }
}

export default compareController;