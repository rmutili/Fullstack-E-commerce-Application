import mongoose from "mongoose";

// Review schema
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      // Associate user with review
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference User model
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Associate user with product
      required: true,
      ref: "User", // Reference User model
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // Array of review objects
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
