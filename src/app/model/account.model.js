import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-generator';
mongoose.set('strictQuery', false);

const Schema = mongoose.Schema;

const account = new Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, require: true, default: "member"},
}, {
    timestamps: true
})

mongoose.plugin(slug);
account.plugin(MongooseDelete, {deletedAt: true});

const Account = mongoose.model("account", account)

export default Account;