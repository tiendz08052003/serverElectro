import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";


const Schema = mongoose.Schema;

const Data = new Schema({
    idSelection: { type: String, require: true },
    name: { type: String, require: true},
    slug: {type: String, slug: "name", unique: true},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
Data.plugin(mongoose_delete, { overrideMethods: 'all' });

const Menu = mongoose.model("menu", Data);

export default Menu;