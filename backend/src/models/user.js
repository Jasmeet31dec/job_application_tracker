const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String, enum:["admin","customer"], default:"customer"}
},{ timestamps: true });

module.exports = mongoose.model("User",userSchema);