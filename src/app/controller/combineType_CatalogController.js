import CombineType_Catalog from "../model/combineType_Catalog.js";
import utils from "../../utils/index.js";
import Type from "../model/type.js";
import Catalog from "../model/catalog.js";

const combineType_CatalogController = {
    //[GET] api/combineType_Catalog
    combineType_Catalog: (req, res, next) => {
        CombineType_Catalog.find()
        .then((data) => {
                res.json(data);
            })
            .catch(next);
    },

    
    //[GET] api/combineType_Catalog/list
    list: async (req, res, next) => {
        try {
            const dataCombineType_Catalog = await CombineType_Catalog.find()
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            console.log(utils.convertListPropertyToObject(dataCombineType_Catalog));
            res.render("combineType_Catalog/list", {dataCombineType_Catalog, dataType, dataCatalog});
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //[GET] api/combineType_Catalog/create
    create: async (req, res, next) => {
        try {
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            res.render("combineType_Catalog/create", { dataType, dataCatalog});
        } catch (error) {
            res.status(404).json(error);
        }
    },
    
    //[POST] api/combineType_Catalog/create/store
    store: async (req, res, next) => {
        const CombineType_Catalog = new CombineType_Catalog(req.body);
        try {
            await CombineType_Catalog.save() 
            res.redirect("/api/combineType_Catalog/create");
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //[GET] api/combineType_Catalog/edit/:id
    edit: async (req, res, next) => {
        try {
            const dataSingle = await CombineType_Catalog.findOne({_id: req.params.id})
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            res.render("combineType_Catalog/update", {dataSingle, dataType, dataCatalog})       
        } catch (error) {
            res.status(404).json(error);
        } 
    }
}

export default combineType_CatalogController;