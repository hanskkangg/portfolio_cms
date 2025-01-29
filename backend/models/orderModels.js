import mongoose from 'mongoose'


// Order Schema Definition
const orderSchema = new mongoose.Schema({
    // ID of the user who placed the order
    userId: { type: String, required: true },
    // List of items in the order
    items: { type: Array, required: true },
    // Total order amount
    amount: { type: Number, required: true },
    // Shipping address details
    address: { type: Object, required: true },
    // Order status
    status: { type: String, required: true, default:'Order Placed' },
    // Payment method used for the order
    paymentMethod: { type: String, required: true },
    // Payment status
    payment: { type: Boolean, required: true , default: false },
    // Order date
    date: {type: Number, required:true}
})


// Create Order Model (Avoids duplicate model creation in development)
const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;