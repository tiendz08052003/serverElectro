import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;

const account = new Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    admin: {type: Boolean, require: true, default: false},
}, {
    timestamps: true
})

mongoose.plugin(slug);
account.plugin(MongooseDelete, {deletedAt: true});

const Account = mongoose.model("account", account)

export default Account;