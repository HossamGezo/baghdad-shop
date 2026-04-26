// --- Libraries
import { config } from "dotenv";
import mongoose from "mongoose";

config();

// --- Configurations
import connectToDB from "@config/db.js";

// --- Models
import Product from "@models/Product.js";

// --- Data
import { products } from "@data/product.data.js";

const seedProducts = async () => {
  try {
    await connectToDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} Products have been seeded to Database successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed products to Database", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

const deleteProducts = async () => {
  try {
    await connectToDB();

    await Product.deleteMany();

    console.log("Products have been deleted from Database successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to delete products to Database", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

// --- Execute functions using CLI commands
if (process.argv[2] === "-seed") seedProducts();
else if (process.argv[2] === "-delete") deleteProducts();
else console.error("Please run with '-seed' or '-delete'");
