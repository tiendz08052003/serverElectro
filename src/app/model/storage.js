import mongoose from "mongoose";

const Schema = mongoose.Schema

const Data = new Schema({
    refreshToken: {type: String, require: true , unique: true},
}, {
    timestamps: true
})

const Storage = mongoose.model("storage", Data);

export default Storage;