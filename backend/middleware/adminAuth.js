const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer TOKEN"

        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Verify the token using JWT_SECRET
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", token_decode); // Debugging

        // Check if the token is valid for admin
        if (!token_decode.admin) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        next();
    } catch (error) {
        console.log("Token Verification Error:", error);
        res.json({ success: false, message: "Invalid or Expired Token" });
    }
};

export default adminAuth;
