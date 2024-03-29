import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

/**
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 * @param {string} id - Product ID
 */

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access Private/admin
 */

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne(product);
    res.json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc Create a product
 * @route POST /api/products
 * @access Private/admin
 */

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description"
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc Update a product
 * @route PUT /api/products/:id
 * @access Private/admin
 */

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc Create new review
 * @route POST /api/products/:id/reviews
 * @access Private
 */

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product =
    (await Product.findById(req.params.id)) ||
    (await Product.findById(req.params.productId));

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString() // r is the review, r.user is the user that created the review
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review); // add the review to the product reviews array

    product.numReviews = product.reviews.length; // update the number of reviews

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / // update the rating
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
};
