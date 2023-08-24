import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;

const Data = new Schema({
    idMenu: { type: String, require: true },
    name: {type: String, require: true, unique: true},
    slug: {type: String, slug: "name", unique: true}
}, {
    timestamps: true,
})

mongoose.plugin(slug);

const Catalog = mongoose.model("catalog", Data);

export default Catalog;
