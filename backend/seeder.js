import color from "colors";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Add users, products, and orders
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit with failure
  }
};

const destroyData = async () => {
  try {
    // Clear database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit with failure
  }
};

// Run seeder with "node backend/seeder -d"
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
