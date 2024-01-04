import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"; // Importing products from data/products.js in Node you must add the .js extension
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config(); // Allow to load environment variables from a .env file into process.env

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound); // Middleware for 404 errors
app.use(errorHandler); // Middleware for 500 errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.red.bold
  );
});
