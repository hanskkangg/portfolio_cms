import mongoose from "mongoose";

// Defines how user data is stored in the database
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false })


// Avoid re-defining the model during development
const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel