import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const Schema = mongoose.Schema

const Data = new Schema({
    idProduct: {type: String},
    idCatalog: {type: String},
}, {
    timestamps: true,
})

mongoose.plugin(slug);

const productCatalog = mongoose.model("productCatalog", Data);

export default productCatalog

