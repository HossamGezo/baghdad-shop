// --- Libraries
import mongoose from "mongoose";

// --- Database Connection Logic
const connectToDB = async () => {
  const uri = process.env.NODE_ENV === "DEVELOPMENT" ? process.env.MONGO_URI : process.env.MONGO_CLOUD_URI;

  if (!uri) {
    throw new Error(`MongoDB URI for ${process.env.NODE_ENV} is missing!`);
  }

  try {
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB (${process.env.NODE_ENV}) (^_^)`);
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB ${error}`);
  }
};

export default connectToDB;
