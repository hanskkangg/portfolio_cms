import mongoose from 'mongoose'

// Structure for each order in the database
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default:'Order Placed' },
    paymentMethod: { 
        type: String, 
        required: true,
        set: value => value.toLowerCase() === 'cod' ? 'Cash on Delivery' 
               : value.toLowerCase() === 'etransfer' ? 'E-Transfer' 
               : value
    },
    payment: { type: Boolean, required: true , default: false },
    date: {type: Number, required:true}
})

// Avoid re-defining the model during development
const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;