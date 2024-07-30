import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const compare = new Schema({
    idAccount: { type: String},
    idHardware: { type: String},
    idProduct: { type: String, require: true},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
compare.plugin(mongoose_delete, { overrideMethods: 'all' });

const Compare = mongoose.model("compare", compare);

export default Compare;