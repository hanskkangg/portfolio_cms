import jwt from 'jsonwebtoken'

// Middleware to check if user is logged in
const authUser = async (req, res, next) => {

    const { token } = req.headers;

    // If no token, block the request
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        // Try to decode the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        // Add user ID from token to request body so routes can use it
        req.body.userId = token_decode.id
        // Continue to next route or controller
        next()

    } catch (error) {
        // If token is invalid or expired, show error
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser