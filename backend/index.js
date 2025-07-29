import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors' 
import Razorpay from 'razorpay'
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import statsRoutes from './routes/statsRoutes.js';
let port = process.env.PORT || 6000

// --- NEW: Check for Razorpay keys before starting ---
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("FATAL ERROR: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are not defined in .env file.");
    process.exit(1); // Stop the server if keys are missing
}

// --- RAZORPAY INSTANCE ---
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: [ "https://moren-frago-website-frontend.onrender.com", "https://moren-frago-website-admin.onrender.com"],
    credentials: true
}))

// --- API ROUTES ---
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/stats", statsRoutes)

// --- ROUTE TO PROVIDE RAZORPAY KEY TO FRONTEND ---
app.get("/api/getkey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
})

app.listen(port, () => {
    console.log("Hello From Server")
    connectDb()
})
