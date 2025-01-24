import mongoose from "mongoose";



//creating schema
const productSchema = new mongoose.Schema({

    name: {type:String, required:true }, 
    description: {type:String, required:true }, 
    price: {type:Number, required:true }, 
    image: {type:Array, required:true }, 
    category: {type:String, required:true }, 
    subCategory: {type:String, required:true }, 
    sizes: {type:Array, required:true }, 
    bestseller :{type: Boolean},
    date: {type:Number, required:true}
})

//when product is availbe the model will be used, if its not available it will create one 
const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModels