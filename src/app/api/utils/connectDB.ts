import mongoose from "mongoose";

const URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!URI) {
  throw new Error("Environment variable NEXT_PUBLIC_MONGO_URI is not defined.");
}

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
