import userModels from "../models/userModels.js"


// add products to user cart
const addToCart = async (req,res) => {
    try {
        
        // Extract userId, itemId, and size from request body
        const { userId, itemId, size } = req.body


        // Find user by ID
        const userData = await userModels.findById(userId)
        let cartData = await userData.cartData;


        // Check if the item already exists in the cart
        if (cartData[itemId]) {

            // If the same size exists, increase the quantity
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }

            else {
            // If size does not exist, add size with quantity 1
                cartData[itemId][size] = 1
            }

        } else {

            // If item does not exist, add new item with the selected size
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }


        // Update the user's cart in the database
        await userModels.findByIdAndUpdate(userId, {cartData})

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req,res) => {
    try {
        
        // Extract userId, itemId, size, and new quantity from request body
        const { userId ,itemId, size, quantity } = req.body


        // Find user by ID
        const userData = await userModels.findById(userId)
        let cartData = await userData.cartData;


        // Update the quantity of the selected size
        cartData[itemId][size] = quantity


        // Update the user's cart in the database
        await userModels.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req,res) => {

    try {
        
        // Extract userId from request body
        const { userId } = req.body
        

        // Find user by ID and retrieve cart data
        const userData = await userModels.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }