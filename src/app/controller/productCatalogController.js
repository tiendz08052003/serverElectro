import productCatalog from '../model/productCatalog.js';
import utils from '../../utils/index.js';
import * as catalogServices from "../../Services/catalogServices.js"
import * as productServices from "../../Services/productServices.js"
import * as menuServices from "../../Services/menuServices.js"

const productCatalogController = {
    getProductCatalog: (req, res, next) => {
        productCatalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    create: (req, res, next) => {
        let listCatalog, listProduct, listMenu;
        const fetchAPI = async () => {
            const data = await catalogServices.getCatalog();
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
    }
}

export default productCatalogController;