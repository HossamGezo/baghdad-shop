// --- Libraries
import mongoose from "mongoose";
import { config } from "dotenv";

config();

// --- Configurations
import connectToDB from "@config/db.js";

// --- Models
import Order from "@models/Order.js";
import User from "@models/User.js";
import Product from "@models/Product.js";

// --- Data
import { orders } from "@data/order.data.js";

const seedOrders = async () => {
  try {
    await connectToDB();

    await Order.deleteMany();

    console.log("Seeding Orders started...");

    const dbUsers = await User.find();
    const dbProducts = await Product.find();

    const finalOrders = orders.map((oldOrder) => {
      const realUser = dbUsers.find((user) => user.email === oldOrder.email);

      const mappedItems = oldOrder.orderItems.map((oldItem) => {
        const realProduct = dbProducts.find((p) => p.title === oldItem.title);

        return {
          productId: realProduct?._id,
          title: oldItem.title,
          image: realProduct?.images[0]?.url || "",
          price: oldItem.price,
          count: oldItem.count,
        };
      });

      return {
        ...oldOrder,
        userId: realUser?._id,
        orderItems: mappedItems,
      };
    });

    await Order.insertMany(finalOrders);
    console.log(`${finalOrders.length} Orders have been linked and seeded successfully!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed orders:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

const deleteOrders = async () => {
  try {
    await connectToDB();

    await Order.deleteMany();

    console.log("Orders have been deleted from Database");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to delete orders:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

// --- Execute CLI commands
if (process.argv[2] === "-seed") seedOrders();
else if (process.argv[2] === "-delete") deleteOrders();
else console.error("Please run with '-seed' or '-delete'");
