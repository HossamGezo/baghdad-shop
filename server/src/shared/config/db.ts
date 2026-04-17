// --- Libraries
import mongoose from "mongoose";

// --- Database Connection Logic
const connectToDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI is missing!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB (^_^)");
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB ${error}`);
  }
};

export default connectToDB;
