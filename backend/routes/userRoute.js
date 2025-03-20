import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Cloudflare Turnstile Verification Route
userRouter.post('/verify-turnstile', async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ verified: false, message: "No token provided" });
        }

        const verifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
        const secretKey = process.env.CLOUDFLARE_SECRET_KEY;

        const response = await fetch(verifyURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: secretKey,
                response: token,
            }),
        });

        const data = await response.json();

        if (data.success) {
            return res.json({ verified: true });
        } else {
            return res.status(400).json({ verified: false, message: "Cloudflare verification failed" });
        }
    } catch (error) {
        console.error("Error verifying Turnstile token:", error);
        res.status(500).json({ verified: false, message: "Server error" });
    }
});

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

export default userRouter;
