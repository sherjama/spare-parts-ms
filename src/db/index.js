import mongoose from "mongoose"
import DB_NAME from "../constants"

export const connectDB = async()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI/DB_NAME}`)
    } catch (error) {
        console.log("Mongo DB connected !! Db host :", connectionInstance.connection.host);
    }

}
