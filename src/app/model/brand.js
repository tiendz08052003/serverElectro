import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import MongooseDelete from 'mongoose-delete';
const Schema = mongoose.Schema;

const brand = new Schema({
    name: {type: String, require: true, unique: true},
    slug: {type: String, slug:"name", unique: true}
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug, {deletedAt : true});
brand.plugin(MongooseDelete, {deletedAt: true});

const Brand = mongoose.model("brand", brand);

export default Brand;