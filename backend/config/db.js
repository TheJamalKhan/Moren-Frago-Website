import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("DB Connection Failed")
    }   
}
export default connectDb
