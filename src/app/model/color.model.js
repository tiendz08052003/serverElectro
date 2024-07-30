import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import MongooseDelete from 'mongoose-delete';
mongoose.set('strictQuery', false);
const Schema = mongoose.Schema;

const color = new Schema({
    name: {type: String, require: true, unique: true},
    slug: {type: String, slug:"name", unique: true}
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
color.plugin(MongooseDelete, {deletedAt:true});

const Color = mongoose.model("color", color);

export default Color;