import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}}`
    );
    console.log(
      "Mongo DB connected !! Db host :",
      connectionInstance.connection.host
    );
    console.log(typeof process.env.MONGODB_URI);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
