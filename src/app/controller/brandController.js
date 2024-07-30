import Brand from "../model/brand.model.js";

const brandController = {
    //[get] /brand
    brand: (req, res, next) => {
        Brand.find()
            .then(data => {
                res.json(data);
            })
            .catch(next)
    },

    //[get] /brand/create
    create: (req, res, next) => {
      res.render('brand/create');  
    },

    //[post] /brand/create/store
    store: (req, res, next) => {
        const data = new Brand(req.body);
        data.save()
            .then(() => {
                res.redirect('/api/brand/create');
            })
            .catch(next)
    },

    //[get] /brand/list
    list: async(req, res, next) => {
        try {
            const x = await Brand.find();
            const data = x.filter(y => y.deleted === false) 
            res.render("brand/list", {data})
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[get] /brand/trash
    trash:async (req, res, next) => {
        try {
            const x = await Brand.find();
            const data = x.filter(y => y.deleted === true);
            res.render("brand/trash", {data})
        } catch (error) {            
            res.status(404).json("Error");
        }
    },

    //[delete] /brand/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Brand.delete(object)
            .then(() => {
                res.redirect("/api/brand/list");
            })
            .catch(next)
    },

    //[patch] /brand/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Brand.restore(object)
            .then(() => {
                res.redirect("/api/brand/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        Brand.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/brand/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deleteBrandsForever/:id
    deleteBrandsForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Brand.deleteMany(object)
            .then(() => {
                res.redirect("/api/brand/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        Brand.find({_id: req.params.id})
            .then((data) => {
                res.render("brand/update", {data: data[0]});
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        Brand.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/brand/list");
            })
            .catch(next)
    }

}

export default brandController;