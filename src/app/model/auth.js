import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;

const Data = new Schema({
    userName: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    admin: {type: Boolean, require: true, default: false},
}, {
    timestamps: true
})

mongoose.plugin(slug);
Data.plugin(MongooseDelete, {deletedAt: true});

const Auth = mongoose.model("auth", Data)

export default Auth;