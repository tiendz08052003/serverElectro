import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import MongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema

const Data = new Schema({
    idProduct: {type: String},
    idCatalog: {type: String},
}, {
    timestamps: true,
})

mongoose.plugin(slug);
Data.plugin(MongooseDelete, {deletedAt:true});

const productCatalog = mongoose.model("productCatalog", Data);

export default productCatalog

