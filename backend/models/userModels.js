import mongoose from "mongoose";

//creating user schema

const userSchema = new mongoose.Schema({

    name: {type:String, required:true},
    //email is set to unique meaning one email can only be assinged to one account
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    //default value is empty for empty cart
    cartData: {type:Object, default:{}}




}, {minimize:false})


const userModels = mongoose.models.user || mongoose.model('user', userSchema);

export default userModels