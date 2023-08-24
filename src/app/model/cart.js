import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";
import AutoIncrementFactory from 'mongoose-sequence';


const Schema = mongoose.Schema;

const Data = new Schema({
    idProduct: { type: String },
    count: {type: Number, require: true}
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
Data.plugin(mongoose_delete, { overrideMethods: 'all' });

const Cart = mongoose.model("cart", Data);

export default Cart;