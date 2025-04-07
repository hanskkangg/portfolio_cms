import mongoose from "mongoose";


// Structure for each product stored in the database
const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    image: { type: Array, required: true }, 
    category: { type: String, required: true }, 
    subCategory: { type: String, required: true }, 
    sizes: { type: Array, required: true }, 
    bestseller: { type: Boolean, default: false }, 
    date: { type: Number, required: true }
}, { timestamps: true }); 


// Avoid re-defining the model during development
const productModels = mongoose.models.product || mongoose.model("product", productSchema);

export default productModels;
