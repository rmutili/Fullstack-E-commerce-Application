import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const createOrder = asyncHandler(async (req, res) => {
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
  if (!orderItems || (orderItems && orderItems.length === 0)) {
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

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */

const getOrderById = asyncHandler(async (req, res) => {
  // Get order by ID
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // Check if order exists
  if (order) {
    // Send back the order
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */

const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Get order by ID
  const order = await Order.findById(req.params.id);

  // Check if order exists
  if (order) {
    // Update order
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      // Get data from PayPal
      id: req.body.id,
      state: req.body.state,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };

    // Save order to database
    const updatedOrder = await order.save();

    // Send back the updated order
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */

const getMyOrders = asyncHandler(async (req, res) => {
  // Get all orders by logged in user
  const orders = await Order.find({ user: req.user._id });

  // Send back the orders
  res.json(orders);
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private
 */

const getOrders = asyncHandler(async (req, res) => {
  // Get all orders
  const orders = await Order.find({}).populate("user", "name");

  // Send back the orders
  res.json(orders);
});

/**
 * @desc Update order to delivered
 * @route PUT /api/orders/:id/deliver
 * @access private/admin
 */

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered
};
