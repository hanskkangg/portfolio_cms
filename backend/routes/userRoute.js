import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Route to verify Turnstile token from frontend before allowing access
userRouter.post('/verify-turnstile', async (req, res) => {
    try {
        const { token } = req.body;

        
        // Make sure token is provided
        if (!token) {
            return res.status(400).json({ verified: false, message: "No token provided" });
        }

        const verifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
        const secretKey = process.env.CLOUDFLARE_SECRET_KEY;

        
        // Send token to Cloudflare for verification
        const response = await fetch(verifyURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: secretKey,
                response: token,
            }),
        });

        const data = await response.json();

        
        // If Cloudflare confirms success, return verified
        if (data.success) {
            return res.json({ verified: true });
        } else {
            // If verification fails, return error response
            return res.status(400).json({ verified: false, message: "Cloudflare verification failed" });
        }
    } catch (error) {
        console.error("Error verifying Turnstile token:", error);
        res.status(500).json({ verified: false, message: "Server error" });
    }
});

// User registration route
userRouter.post('/register', registerUser);

// User login route
userRouter.post('/login', loginUser);

// Admin login route
userRouter.post('/admin', adminLogin);

export default userRouter;
