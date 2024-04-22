import Product from "../model/product.js";
import utils from "../../utils/index.js";
import uploadCloud from "../../middleware/uploader.js";
import DetailsType from "../model/detailsType.js";
import Brand from "../model/brand.js";
import Color from "../model/color.js";

const productController = {
    //[GET] /product
    product: (req, res, next) => {
        Product.find()
            .then((data) => {
                    res.json(data);
                }
            )
            .catch(next)
        // res.render("index");
    },

    //[GET] product/create 
    create: async(req, res, next) => {
        try {
            const listDetailsType = await DetailsType.find();
            const listBrand = await Brand.find();
            const listColor = await Color.find();
            res.render("product/create", {listDetailsType, listBrand, listColor});
        } catch (error) {
            res.status(404).json("Error");
        }
    },

    //[POST] /product/create/store 
    store: async (req, res, next) => {
        try {
            const image = await uploadCloud(req.body.image, req.body.name);
            if(image)
            {
                const product = new Product({
                    ...req.body,
                    image: image
                }); 
                await product.save()
                res.redirect("/api/product/list")
            }
            else
                return res.status(404).json("Error");
        } catch (error) {
            return res.status(404).json("Error");
        }
    },

    //[GET] /product/search?q=?&type=less
    search: async (req, res, next) => {
        try {
            const data = await Product.find()
            const listData = data.filter(childData => {
                if(childData.name.includes(req.query.q) || childData.name.includes((req.query.q).toUpperCase()) || childData.name.includes((req.query.q).toLowerCase()))
                {
                    return childData;
                }
            });
            res.json(listData)
        } catch (error) {
            return res.status(404).json("Error");
        }
    },

    //[GET] /product/list
    list: async (req, res, next) => {
        try {
            const listData = await Product.find()
            res.render("product/list", {listData})
        } catch (error) {
            return res.status(404).json("Error");
        }
    },

    //[GET] / product/trash
    trash: async (req, res, next) => {
        try {
            const data = await Product.findDeleted();
            const listData = data.filter(x => x.deleted)
            res.render("product/trash", {listData})
        } catch (error) {
            return res.status(404).json("Error");
        }
    },

    //[GET] /product/edit/:id
    edit: async (req, res, next) => {
        try {
            const data = await Product.findById({_id: req.params.id})
            const listDetailsType = await DetailsType.find();
            const listBrand = await Brand.find();
            const listColor = await Color.find();
            const singleData = utils.convertSinglePropertyToObject(data)
            res.render("product/update", {
                singleData,
                listDetailsType,
                listBrand,
                listColor
            })
        } catch (error) {
            return res.status(404).json("Error");
        }
    },

    //[PUT] /product/update/:id
    update: (req, res, next) => {
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/product/list");
            })
            .catch(next)
    },

    //[DELETE] /product/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Product.delete(object)
            .then(() => {
                res.redirect("/api/product/list");
            })
            .catch(next);
    },

    //[PATCH] /product/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Product.restore(object)
            .then(() => {
                res.redirect("/api/product/list");
            })
            .catch(next)
    },

    //[DELETE] /product/trash/delete/:id
    deleteForever: (req, res, next) => {
        Product.findByIdAndDelete({ _id: req.params.id})
            .then(() => {
                res.redirect("/api/product/trash");
            })
            .catch(next)
    },

    //[DELETE] /product/trash/deleteProducts/:id
    permanentlyDeleted: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        Product.deleteMany(object)
            .then(() => {
                res.redirect("/api/product/list");
            })
            .catch(next)
    }
} 

export default productController
