// ✅ Move this above other routes
app.post('/api/verify-turnstile', async (req, res) => {
    try {
        const { token } = req.body;
        console.log("🔹 Received Turnstile Token:", token);

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
        console.log("🔍 Cloudflare Response:", data); // ✅ Log Cloudflare response

        if (data.success) {
            return res.json({ verified: true });
        } else {
            return res.status(400).json({ verified: false, message: "Cloudflare verification failed", details: data });
        }
    } catch (error) {
        console.error("🚨 Error verifying Turnstile token:", error);
        res.status(500).json({ verified: false, message: "Server error" });
    }
});

// ✅ Now register other API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
