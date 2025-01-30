import orderModels from "../models/orderModels.js";
import userModels from "../models/userModels.js";
import Stripe from 'stripe'



// global variables
const currency = 'cad'
const deliveryCharge = 0

    // gateway initialize
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;


        // Create order data object
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }


        // Save order to database
        const newOrder = new orderModels(orderData)
        await newOrder.save()

        // Clear user's cart after placing the order
        await userModels.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body
        const { origin } = req.headers;


        // Create order data object
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Mastercard / Visa",
            payment:false,
            date: Date.now()
        }


        // Save order to database
        const newOrder = new orderModels(orderData)
        await newOrder.save()

        // Prepare line items for Stripe payment
        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))


        // Add delivery charge to Stripe checkout
        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })


        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

    // Verify Stripe 
    const verifyStripe = async (req,res) => {

        const { orderId, success, userId } = req.body

        try {
            if (success === "true") {
                await orderModels.findByIdAndUpdate(orderId, {payment:true});
                await userModels.findByIdAndUpdate(userId, {cartData: {}})
                res.json({success: true});
            } else {
                await orderModels.findByIdAndDelete(orderId)
                res.json({success:false})
            }
            
        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }

    }


// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        // Fetch all orders from the database
        const orders = await orderModels.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body


        // Fetch orders for the specific user
        const orders = await orderModels.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body


        // Update order status in the database
        await orderModels.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// Export all functions
export { verifyStripe ,placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus}