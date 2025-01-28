import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'



// Create an instance of an Express router
const cartRouter = express.Router()


// Route to get user cart data (Requires authentication)
cartRouter.post('/get',authUser, getUserCart)

// Route to add an item to the cart (Requires authentication)
cartRouter.post('/add',authUser, addToCart)

// Route to update an item quantity in the cart (Requires authentication)
cartRouter.post('/update',authUser, updateCart)

export default cartRouter