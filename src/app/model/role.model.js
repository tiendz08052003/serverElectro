import mongoose from "mongoose";
const Scheme = mongoose.Schema;

const role = new Scheme({
    idRole: {type: String, require: true},
    name: {type: String, require}
},{
    timestamps: true, // Tự động lưu ngày giờ
}) 

const Role = mongoose.model("role", role);

export default Role;