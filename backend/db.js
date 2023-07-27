import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb Connected");
  } catch (error) {
    console.log("Db connect error: ", error);
    process.exit(1);
  }
};

export default connectDb;