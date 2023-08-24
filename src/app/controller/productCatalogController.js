import productCatalog from '../model/productCatalog.js';
import utils from '../../utils/index.js';
import * as catalogServices from "../../Services/catalogServices.js"
import * as productServices from "../../Services/productServices.js"

const productCatalogController = {
    getProductCatalog: (req, res, next) => {
        productCatalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    create: (req, res, next) => {
        let data1, data2;
        const fetchAPI1 = async () => {
            const res1 = await catalogServices.getCatalog();
            data1 = res1;
            const fetchAPI2 = async () => {
                const res2 = await productServices.getProduct();
                data2 = res2;
                if(data1 && data2){
                    res.render("productCatalog/create", {data1, data2});
                }
                else
                {
                    console.log("failed!!!");
                }
            }
            fetchAPI2();
        }
        fetchAPI1();
        
    },

    store: (req, res, next) => {
        const data = new productCatalog(req.body);
        data.save()
            .then(() => {
                res.redirect("/productCatalog/create");
            })
            .catch(next) 
    }
}

export default productCatalogController;