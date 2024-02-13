import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // Importing products from data/products.js in Node you must add the .js extension
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

dotenv.config(); // Allow to load environment variables from a .env file into process.env

connectDB();

const app = express();
app.use(express.json()); // Allow to accept JSON data in the body

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

const __dirname = path.resolve(); // Allow to use ES6 module syntax with Node.js
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Allow to access the uploads folder statically

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build"))); // Set the frontend folder as static folder
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound); // Middleware for 404 errors
app.use(errorHandler); // Middleware for 500 errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.red.bold
  );
});
