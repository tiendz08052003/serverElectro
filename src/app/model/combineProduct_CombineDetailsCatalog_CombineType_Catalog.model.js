import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const Schema = mongoose.Schema;

const combineProduct_CombineDetailsCatalog_CombineType_Catalog = new Schema({
    idCombineDetailsCatalog_CombineType_Catalog: {type: String},
    idProduct: {type: String}
}, {
    timestamps: true
})

combineProduct_CombineDetailsCatalog_CombineType_Catalog.plugin(mongoose_delete, {overrideMethods: 'all'})

const CombineProduct_CombineDetailsCatalog_CombineType_Catalog = mongoose.model("combineProduct_CombineDetailsCatalog_CombineType_Catalog", combineProduct_CombineDetailsCatalog_CombineType_Catalog);

export default CombineProduct_CombineDetailsCatalog_CombineType_Catalog;
