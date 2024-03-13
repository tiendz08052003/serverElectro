import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import MongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema

const Data = new Schema({
    name: {type: String, require: true, unique: true},
    idSelection: {type: String},
    slug: {type: String, slug: "name", unique: true},
}, {
    timestamps: true,
})

mongoose.plugin(slug);
Data.plugin(MongooseDelete, {deletedAt: true});

const Type = mongoose.model('type', Data);

export default Type