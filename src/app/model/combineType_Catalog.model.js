import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import slug from "mongoose-slug-generator";

const Schema = mongoose.Schema;

const combineType_Catalog = new Schema({
    id: {type: String, require: true},
    idType: {type: String, require: true},
    idCatalog: {type: String, require: true}
}, {
    timestamps: true,
})

mongoose.plugin(slug);
combineType_Catalog.plugin(MongooseDelete, {deletedAt: true});
const CombineType_Catalog = mongoose.model('combineType_Catalog', combineType_Catalog);

export default CombineType_Catalog;