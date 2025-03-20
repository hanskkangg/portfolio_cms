import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import fetch from 'node-fetch';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.post('/api/verify-turnstile', async (req, res) => { 
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


// ✅ Register Other API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Default Route
app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));
