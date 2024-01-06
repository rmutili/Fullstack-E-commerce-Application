import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/", getProducts);

router.route("/:id", getProductById);

export default router;
