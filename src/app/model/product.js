import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';
import mongoose_delete from 'mongoose-delete'

const Schema = mongoose.Schema


const product = new Schema({
    idBrand: {type: String},
    idColor: {type: String},
    idDetailsType: {type: String},
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
product.plugin(mongoose_delete, { overrideMethods: 'all' }); // thư viện xóa phần bề mặt còn trong dữ liệu vẫn còn

const Product = mongoose.model("product", product) // kết nối mới model

export default Product