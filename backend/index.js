import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors' 
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
let port = process.env.PORT || 6000

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [ "http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)

app.listen(port, () => {
    console.log("Hello From Server")
    connectDb()
})