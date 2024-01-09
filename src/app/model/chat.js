import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;

const Data = new Schema({
    idAuth: { type: String, require: true },
    idPhong: {type: String},
    idKhachChat: {type: String},
    message: {type: Array},
    queue: {type: Boolean, require: true, default: true},
    admin: {type: Boolean},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

const Chat = mongoose.model("Chat", Data)

export default Chat