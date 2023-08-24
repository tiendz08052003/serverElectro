import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
const Schema = mongoose.Schema;

const Data = new Schema({
    name: {type: String, require: true, unique: true},
    slug: {type: String, slug:"name", unique: true}
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);

const Brand = mongoose.model("Brand", Data);

export default Brand;