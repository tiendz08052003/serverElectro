import Product from "../model/product.js";
import utils from "../../utils/index.js";
import * as typeServices from "../../Services/typeServices.js";
import * as brandServices from "../../Services/brandServices.js";
import * as colorSerVices from "../../Services/colorServices.js";
import * as selectionSerVices from "../../Services/selectionServices.js";
import cloudinary from "../../middleware/cloudinary.js";

const productController = {
    //[GET] /product
    indexDefault: (req, res, next) => {
        Product.find()
            .then((datas) => {
                    res.json(datas);
                }
            )
            .catch(next)
        // res.render("index");
    },

    //[GET] product/create 
    create: (req, res, next) => {
        const fetchAPI = async () => {
            const listType = await typeServices.getType();
            const listBrand = await brandServices.getBrand();
            const listColor = await colorSerVices.getColor();
            const listSelection = await selectionSerVices.getSelection();
            res.render("product/create", {listSelection, listType, listBrand, listColor});
        fetchAPI();
        }
    },

    //[POST] /product/create/store 
    store: (req, res, next) => {
        cloudinary.uploader.upload(req.body.image, {
            upload_preset: 'unsigned_upload',
            public_id: req.body.name, 
            allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"]
        }, (err, result) => {
            if(err)
                res.status(400).json("ERR!");
            else
            {
                const data = new Product({
                    ...req.body,
                    image: result.secure_url
                });
                data.save()
                    .then(() => {
                        res.redirect("/api/productCatalog/create")
                    })
                    .catch(next);
            }
        })
    },

    //[GET] /product/search?q=?&type=less
    search: (req, res, next) => {
        Product.find()
            .then((datas) => {
                const a = utils.convertListProtoryToObject(datas)
                const listData = a.filter(data => {
                    if(data.name.includes(req.query.q) || data.name.includes((req.query.q).toUpperCase()) || data.name.includes((req.query.q).toLowerCase()))
                    {
                        return data;
                    }
                });
                res.json(listData)
            })
            .catch(next)
    },

    //[GET] /product/list
    list: (req, res, next) => {
        Product.find()
            .then((datas) => {
                const listData = utils.convertListProtoryToObject(datas)
                res.render("product/list", {listData})
            })
            .catch(next)
    },

    //[GET] / product/trash
    trash: (req, res, next) => {
        Product.findDeleted()
            .then((datas) => {
                const a = utils.convertListProtoryToObject(datas)
                const listData = a.filter((b) => {
                    if(b.deleted === true)
                    {
                        return b;
                    }})
                res.render("product/trash", {listData})
            })
            .catch(next)
    },

    //[GET] /product/edit/:id
    edit: (req, res, next) => {
        Product.findById({_id: req.params.id})
            .then((data) => {
                const singleData = utils.convertSingleProtoryToObject(data)
                res.render("product/update", {singleData})
            })
            .catch(next)
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
        Product.delete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/product/list");
            })
            .catch(next);
    },

    //[PATCH] /product/trash/restore/:id
    restore: (req, res, next) => {
        Product.restore({_id: req.params.id})
            .then(() => {
                res.redirect("/api/product/list");
            })
            .catch(next)
    },

    //[DELETE] /product/trash/delete/:id
    deleteForever: (req, res, next) => {
        Product.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/product/trash");
            })
            .catch(next)
    }
} 

export default productController
