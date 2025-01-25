import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized! Login again" });
        }

        // Get the token from the header
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token belongs to the admin
        if (!decoded || decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Wrong token! Login Again" });
        }

        // Allow request to proceed
        next();

    } catch (error) {
        console.error(error);
        res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};

export default adminAuth;
