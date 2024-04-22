import mongoose from "mongoose";
import slug from 'mongoose-slug-generator'

const Schema = mongoose.Schema;

const combineDetailsCatalog_CombineType_Catalog = new Schema({
    idCombineType_Catalog: {type: String},
    idDetailsCatalog: {type: String}
}, {
    timestamps: true
})

const CombineDetailsCatalog_CombineType_Catalog = mongoose.model("CombineDetailsCatalog_CombineType_Catalog", combineDetailsCatalog_CombineType_Catalog);

export default CombineDetailsCatalog_CombineType_Catalog;
