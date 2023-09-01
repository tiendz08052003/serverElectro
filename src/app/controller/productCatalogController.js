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
        const fetchAPI1 = async () => {
            const res1 = await catalogServices.getCatalog();
            listCatalog = res1;
            const fetchAPI2 = async () => {
                const res2 = await productServices.getProduct();
                listProduct = res2;
                const fetchAPI3 = async () => {
                    const res3 = await menuServices.getMenu();
                    listMenu = res3;
                    if(listCatalog && listProduct && listMenu){
                        res.render("productCatalog/create", {listCatalog, listProduct, listMenu});
                    }
                    else
                    {
                        console.log("failed!!!");
                    }
                }
                fetchAPI3();
            }
            fetchAPI2();
        }
        fetchAPI1();
        
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