import jwt from 'jsonwebtoken'


// Middleware to Authenticate User
const authUser = async (req, res, next) => {


    // Extract token from request headers
    const { token } = req.headers;


    // If token is missing, return an unauthorized response
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        // Verify the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        // Attach the decoded user ID to the request body
        req.body.userId = token_decode.id

        // Proceed to the next middleware or route handler
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default authUser