import jwt from 'jsonwebtoken'


// Middleware for admin authentication
const adminAuth = async (req,res,next) => {
    try {

        // Extract token from request headers
        const { token } = req.headers


        // If token is missing, return unauthorized response
        if (!token) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }



        // Verify the token using JWT secret key
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);


        // Check if decoded token matches stored admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }

        // If everything is valid, proceed to the next middleware or route
        next()
    } catch (error) {

         // Log error for debugging
        console.log(error)
        
        // Return error response
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth