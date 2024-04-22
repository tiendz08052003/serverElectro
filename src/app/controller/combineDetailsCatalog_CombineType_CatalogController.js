import Catalog from "../model/catalog.js";
import CombineDetailsCatalog_CombineType_Catalog from "../model/combineDetailsCatalog_CombineType_Catalog.js";
import CombineType_Catalog from "../model/combineType_Catalog.js";
import DetailsCatalog from "../model/detailsCatalog.js";
import Type from "../model/type.js";


const combineDetailsCatalog_CombineType_CatalogController = {
    combineDetailsCatalog_CombineType_Catalog: (req, res, next) => {
        CombineDetailsCatalog_CombineType_Catalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    list: async (req, res, next) => {
        try {
            const dataCombineDetailsCatalog_CombineType_Catalog = await CombineDetailsCatalog_CombineType_Catalog.find();
            const dataDetailsCatalog = await DetailsCatalog.find();
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            const dataCombineType_Catalog = await CombineType_Catalog.find();
            res.render("combineDetailsCatalog_CombineType_Catalog/list", {dataCombineDetailsCatalog_CombineType_Catalog, dataDetailsCatalog, dataType, dataCatalog, dataCombineType_Catalog})
        } catch (error) {
            res.status(404).json(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const dataDetailsCatalog = await DetailsCatalog.find();
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            const dataCombineType_Catalog = await CombineType_Catalog.find();
            res.render("combineDetailsCatalog_CombineType_Catalog/create", {dataDetailsCatalog, dataType, dataCatalog, dataCombineType_Catalog})
        } catch (error) {
            res.status(404).json(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {idDetailsCatalog, ...others} = req.body;
            const combineType_Catalog = await CombineType_Catalog.findOne({idType: others.idType, idCatalog: others.idCatalog});
            const data = {
                idDetailsCatalog,
                idCombineType_Catalog: combineType_Catalog._id.valueOf()
            }
            const combineDetailsCatalog_CombineType_Catalog = new CombineDetailsCatalog_CombineType_Catalog(data);
            await combineDetailsCatalog_CombineType_Catalog.save() 
            res.redirect("/api/combineDetailsCatalog_CombineType_Catalog/create")
        } catch (error) {
            res.status(404).json(error);
        }
    }
}

export default combineDetailsCatalog_CombineType_CatalogController;