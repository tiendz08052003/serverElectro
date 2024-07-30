import CombineProduct_CombineDetailsCatalog_CombineType_Catalog from "../model/combineProduct_CombineDetailsCatalog_CombineType_Catalog.model.js";
import CombineDetailsCatalog_CombineType_Catalog from "../model/combineDetailsCatalog_CombineType_Catalog.model.js";
import CombineType_Catalog from "../model/combineType_Catalog.model.js";
import DetailsCatalog from "../model/detailsCatalog.model.js";
import DetailsType from "../model/detailsType.model.js";
import Catalog from "../model/catalog.model.js";
import Product from "../model/product.model.js";
import Type from "../model/type.model.js";


const combineProduct_CombineDetailsCatalog_CombineType_CatalogController = {
    combineProduct_CombineDetailsCatalog_CombineType_Catalog: (req, res, next) => {
        CombineProduct_CombineDetailsCatalog_CombineType_Catalog.find()
            .then((data) => {
                res.json(data);
            })
            .catch(next)
    },

    list: async (req, res, next) => {
        try {
            const dataCombineProduct_CombineDetailsCatalog_CombineType_Catalog = await CombineProduct_CombineDetailsCatalog_CombineType_Catalog.find();
            const dataCombineDetailsCatalog_CombineType_Catalog = await CombineDetailsCatalog_CombineType_Catalog.find();
            const dataCombineType_Catalog = await CombineType_Catalog.find();
            const dataDetailsCatalog = await DetailsCatalog.find();
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            const dataProduct = await Product.find();
            res.render("combineProduct_CombineDetailsCatalog_CombineType_Catalog/list", {dataCombineProduct_CombineDetailsCatalog_CombineType_Catalog, dataCombineDetailsCatalog_CombineType_Catalog, dataDetailsCatalog, dataType, dataCatalog, dataProduct, dataCombineType_Catalog})
        } catch (error) {
            res.status(404).json(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const dataDetailsCatalog = await DetailsCatalog.find();
            const dataCombineType_Catalog = await CombineType_Catalog.find();
            const dataCombineDetailsCatalog_CombineType_Catalog = await CombineDetailsCatalog_CombineType_Catalog.find();
            const dataDetailsType = await DetailsType.find();
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            const dataProduct = await Product.find();
            res.render("combineProduct_CombineDetailsCatalog_CombineType_Catalog/create", {dataDetailsType, dataDetailsCatalog, dataType, dataCatalog, dataProduct, dataCombineType_Catalog, dataCombineDetailsCatalog_CombineType_Catalog})
        } catch (error) {
            res.status(404).json(error);
        }
    },

    store: async (req, res, next) => {
        const combineProduct_CombineDetailsCatalog_CombineType_Catalog = new CombineProduct_CombineDetailsCatalog_CombineType_Catalog(req.body);
        try {
            await combineProduct_CombineDetailsCatalog_CombineType_Catalog.save() 
            res.redirect("/api/combineProduct_CombineDetailsCatalog_CombineType_Catalog/create")
        } catch (error) {
            res.status(404).json(error);
        }
    },

    softDelete: async (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        try {
            await CombineProduct_CombineDetailsCatalog_CombineType_Catalog.delete(object)
            res.status(201).redirect("/api/combineProduct_CombineDetailsCatalog_CombineType_Catalog/list");
        } catch (error) {
            res.status(404).json(error);
        }
    },

    trash: async (req, res, next) => {
        try {
            const data = await CombineProduct_CombineDetailsCatalog_CombineType_Catalog.findDeleted();
            const dataCombineProduct_CombineDetailsCatalog_CombineType_Catalog = data.filter(x => x.deleted)
            const dataCombineDetailsCatalog_CombineType_Catalog = await CombineDetailsCatalog_CombineType_Catalog.find();
            const dataCombineType_Catalog = await CombineType_Catalog.find();
            const dataDetailsCatalog = await DetailsCatalog.find();
            const dataType = await Type.find();
            const dataCatalog = await Catalog.find();
            const dataProduct = await Product.find();
            res.status(201).render("combineProduct_CombineDetailsCatalog_CombineType_Catalog/trash", {dataCombineProduct_CombineDetailsCatalog_CombineType_Catalog, dataCombineDetailsCatalog_CombineType_Catalog, dataDetailsCatalog, dataType, dataCatalog, dataProduct, dataCombineType_Catalog});
        } catch (error) {
            res.status(404).json(error);
        }
    },

    restore: async (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        try {
            await CombineProduct_CombineDetailsCatalog_CombineType_Catalog.restore(object)
            res.status(201).redirect("/api/combineProduct_CombineDetailsCatalog_CombineType_Catalog/trash");
        } catch (error) {
            res.status(404).json(error);
        }
    }, 

    permanentlyDeleted: (req, res, next) => {
        let array = (req.params.id).split(",");
        const object = {
            _id: array
        }
        CombineProduct_CombineDetailsCatalog_CombineType_Catalog.deleteMany(object)
            .then(() => {
                res.redirect("/api/combineProduct_CombineDetailsCatalog_CombineType_Catalog/trash");
            })
            .catch(next)
    }
}

export default combineProduct_CombineDetailsCatalog_CombineType_CatalogController;