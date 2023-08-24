import mongoose from "mongoose";
import config from "./index.json" assert { type: "json" };
 function connect() {
    mongoose.connect(`mongodb+srv://${config.username}:${config.password}@database.jxz0fmq.mongodb.net/${config.database}?retryWrites=true&w=majority`)
    .then (() => {
        console.log("Connect successful!!!");
    })
    .catch((err) => console.log(err));
 }
 
 export default {connect};
