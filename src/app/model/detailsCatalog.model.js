import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";


const Schema = mongoose.Schema;

const detailsCatalog = new Schema({
    name: { type: String, require: true},
    slug: {type: String, slug: "name", unique: true},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
detailsCatalog.plugin(mongoose_delete, { overrideMethods: 'all' });

const DetailsCatalog = mongoose.model("detailsCatalog", detailsCatalog);

export default DetailsCatalog;