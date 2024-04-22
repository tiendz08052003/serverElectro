import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import MongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema;

const catalog = new Schema({
    name: {type: String, require: true, unique: true},
    slug: {type: String, slug: "name", unique: true}
}, {
    timestamps: true,
})

mongoose.plugin(slug);
catalog.plugin(MongooseDelete, {deletedAt: true});

const Catalog = mongoose.model("catalog", catalog);

export default Catalog;
