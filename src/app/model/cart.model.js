import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongoose_delete from "mongoose-delete";
mongoose.set('strictQuery', false);


const Schema = mongoose.Schema;

const cart = new Schema({
    idAccount: { type: String },
    idProduct: { type: String },
    count: {type: Number, require: true}
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

mongoose.plugin(slug);
cart.plugin(mongoose_delete, { overrideMethods: 'all' });

const Cart = mongoose.model("cart", cart);

export default Cart;