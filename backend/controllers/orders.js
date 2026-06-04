const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return next(new ErrorResponse('No order items', 400));
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json({ success: true, data: createdOrder });
  } catch (err) {
    next(err);
  }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to access this order', 401));
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'id name');
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    order.status = 'Delivered';
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status (placed, preparing, out for delivery, delivered, cancelled)
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    const { status } = req.body;
    if (!status) {
      return next(new ErrorResponse('Please provide a valid order status', 400));
    }

    order.status = status;
    if (status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    next(err);
  }
};
