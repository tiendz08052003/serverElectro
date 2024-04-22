import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";


const Schema = mongoose.Schema;

const wishlist = new Schema({
    idAccount: { type: String},
    idProduct: { type: String},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
wishlist.plugin(mongoose_delete, { overrideMethods: 'all' });

const Wishlist = mongoose.model("wishlist", wishlist);

export default Wishlist;