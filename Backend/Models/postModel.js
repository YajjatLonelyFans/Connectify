const mongoose = require("mongoose")
const {Schema , model} = mongoose
const postSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = model("Post" , postSchema)