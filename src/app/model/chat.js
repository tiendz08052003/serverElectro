import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;

const chat = new Schema({
    idAuth: { type: String, require: true, unique: true },
    idRoom: {type: String},
    message: {type: Array},
    queue: {type: Boolean, require: true, default: true},
    admin: {type: Boolean},
}, {
    timestamps: true, // Tự động lưu ngày giờ
})

const Chat = mongoose.model("chat", chat)

export default Chat