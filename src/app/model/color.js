import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import MongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const Data = new Schema({
    name: {type: String, require: true, unique: true},
    slug: {type: String, slug:"name", unique: true}
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
Data.plugin(MongooseDelete, {deletedAt:true});

const Color = mongoose.model("Color", Data);

export default Color;