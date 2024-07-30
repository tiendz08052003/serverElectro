import mongoose from "mongoose";

const Schema = mongoose.Schema

const storage = new Schema({
    refreshToken: {type: String, require: true , unique: true},
}, {
    timestamps: true
})

const Storage = mongoose.model("storage", storage);

export default Storage;