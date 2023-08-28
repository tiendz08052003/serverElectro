import mongoose from "mongoose";
 function connect() {
    mongoose.connect(`mongodb+srv://nguyendinhtien08052003:tien12345@database.jxz0fmq.mongodb.net/WebSiteCongNghe?retryWrites=true&w=majority`)
    .then (() => {
        console.log("Connect successful!!!");
    })
    .catch((err) => console.log(err));
 }
 
 export default {connect};
