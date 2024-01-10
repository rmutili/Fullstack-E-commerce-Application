import AsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const createOrder = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = req.body;

  // Check if orderItems array is empty
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // Create new order
    const order = await new Order({
      orderItems,
      user: req.user._id, // Get the logged in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    });

    // Save order to database
    const createdOrder = await order.save();

    // Send back the created order
    res.status(201).json(createdOrder);
  }
});

export { createOrder };
