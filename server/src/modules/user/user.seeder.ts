// --- Libraries
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

// --- Configurations
import connectToDB from "@config/db.js";

// --- Models
import User from "@models/User.js";

// --- User Data
import { users } from "@data/user.data.js";

const seedUsers = async () => {
  try {
    await connectToDB();

    await User.deleteMany();

    console.log("Seeding started...");

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        return { ...user, password: hash };
      }),
    );

    await User.insertMany(hashedUsers);

    console.log(`${hashedUsers.length} Users have been seeded to Database successfully`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed users to Database", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

const deleteUsers = async () => {
  try {
    await connectToDB();

    await User.deleteMany();

    console.log("Users have been deleted from Database successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to delete users from Database", error);

    await mongoose.connection.close();
    process.exit(1);
  }
};

// --- Execute functions using CLI commands

if (process.argv[2] === "-seed") seedUsers();
else if (process.argv[2] === "-delete") deleteUsers();
else console.error("Please run with '-seed' or '-delete'");
