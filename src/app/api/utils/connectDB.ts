import mongoose from "mongoose";

const URI: any = process.env.NEXT_PUBLIC_MONGO_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
