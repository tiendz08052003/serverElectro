import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import MongooseDelete from "mongoose-delete";

const Schema = mongoose.Schema

const detailsType = new Schema({
    name: {type: String, require: true, unique: true},
    idType: {type: String},
    slug: {type: String, slug: "name", unique: true},
}, {
    timestamps: true,
})

mongoose.plugin(slug);
detailsType.plugin(MongooseDelete, {deletedAt: true});

const DetailsType = mongoose.model('detailsType', detailsType);

export default DetailsType