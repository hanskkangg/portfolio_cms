import jwt from 'jsonwebtoken'


// Middleware to check if the request is made by an admin
const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        
        // If no token is provided, deny access
        if (!token) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        
        // Decode the token using the secret key
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        
        // Check if the decoded token matches the hardcoded admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        
        // If all checks pass, allow the request to continue
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth