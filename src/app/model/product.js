import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import AutoIncrementFactory from 'mongoose-sequence';
import mongoose_delete from 'mongoose-delete'
const AutoIncrement = AutoIncrementFactory(mongoose);

const Schema = mongoose.Schema


const Data = new Schema({
    idType: {type: String},
    idSelection: {type: String},
    idBrand: {type: String},
    idColor: {type: String},
    name: {type: String, require: true, unique: true},
    image: {type: String}, 
    price: {type: Number, require: true},
    discount: {type: Number},
    recommend: {type: String}, 
    introduce: {type: Array}, 
    slug: { type: String, slug: "name", unique: true},
},{
    timestamps: true, // Tự động lưu ngày giờ
}) 

mongoose.plugin(slug) // thư viện tự tạo slug
Data.plugin(mongoose_delete, { overrideMethods: 'all' }); // thư viện xóa phần bề mặt còn trong dữ liệu vẫn còn

const Product = mongoose.model("product", Data) // kết nối mới model

export default Product