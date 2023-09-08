import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";

const Schema = mongoose.Schema;

const Data = new Schema({
    idAuth: { type: String },
    idProduct: { type: String},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
Data.plugin(mongoose_delete, { overrideMethods: 'all' });

const Compare = mongoose.model("compare", Data);

export default Compare;