import ProductCatalog from '../model/productCatalog.js';
import utils from '../../utils/index.js';
import * as catalogServices from "../../Services/catalogServices.js"
import * as productServices from "../../Services/productServices.js"
import * as menuServices from "../../Services/menuServices.js"
import * as productCatalogServices from "../../Services/productCatalogServices.js"

const productCatalogController = {
    getProductCatalog: (req, res, next) => {
        ProductCatalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    create: (req, res, next) => {
        let listCatalog, listProduct, listMenu;
        const fetchAPI = async () => {
            let data = await catalogServices.getCatalog();
            listCatalog = data;
            data = await productServices.getProduct();
            listProduct = data;
            data = await menuServices.getMenu();
            listMenu = data;
            if(listCatalog && listProduct && listMenu){
                res.render("productCatalog/create", {listCatalog, listProduct, listMenu});
            }
            else
            {
                console.log("failed!!!");
            }
        }
        fetchAPI();
    },

    store: (req, res, next) => {
        const data = new productCatalog(req.body);
        data.save()
            .then(() => {
                res.redirect("/api/productCatalog/create");
            })
            .catch(next) 
    },
    
    //[get] /productCatalog/list
    list: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await productCatalogServices.getProductCatalog();
            const data = x.filter(y => y.deleted === false) 
            const dataProduct = await productServices.getProduct();
            const dataCatalog = await catalogServices.getCatalog();
            console.log(dataProduct);
            res.render("productCatalog/list", {data, dataProduct, dataCatalog})
        }
        fetchAPI();
    },

    //[get] /productCatalog/trash
    trash: (req, res, next) => {
        const fetchAPI = async () => {
            const x = await productCatalogServices.getProductCatalog();
            const data = x.filter(y => y.deleted === true);
            res.render("productCatalog/trash", {data})
        }
        fetchAPI();
    },

    //[delete] /productCatalog/list/delete/:id
    delete: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        ProductCatalog.delete(object)
            .then(() => {
                res.redirect("/api/productCatalog/list");
            })
            .catch(next)
    },

    //[patch] /productCatalog/trash/restore/:id
    restore: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        ProductCatalog.restore(object)
            .then(() => {
                res.redirect("/api/productCatalog/trash");
            })
            .catch(next)
    },

    //[delete] /trash/deleteForever/:id
    deleteForever: (req, res, next) => {
        ProductCatalog.findByIdAndDelete({_id: req.params.id})
            .then(() => {
                res.redirect("/api/productCatalog/trash");
            })
            .catch(next)
    },
    ///[delete] trash/deleteproductCatalogsForever/:id
    deleteProductCatalogsForever: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        ProductCatalog.deleteMany(object)
            .then(() => {
                res.redirect("/api/productCatalog/trash");
            })
            .catch(next)
    },

    ///[patch] update/:id
    edit: (req, res, next) => {
        ProductCatalog.find({_id: req.params.id})
            .then((data) => {
                const fetchAPI = async () => {
                    const dataProduct = await productServices.getProduct();
                    const dataCatalog = await catalogServices.getCatalog();
                    const dataMenu = await menuServices.getMenu();
                    res.render("productCatalog/update", {data: data[0], dataProduct, dataCatalog, dataMenu});
                }
                fetchAPI();
            })
            .catch(next)
    },

    ///[patch] update/:id
    update: (req, res, next) => {
        ProductCatalog.update({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect("/api/productCatalog/list");
            })
            .catch(next)
    }

}

export default productCatalogController;