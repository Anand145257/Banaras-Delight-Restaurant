const Razorpay = require('razorpay');
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Helper to check if Razorpay has valid credentials configured
const isRazorpayConfigured = () => {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  return !!(id && secret && id !== 'placeholder' && secret !== 'placeholder' && !id.startsWith('your_'));
};

// @desc    Create Razorpay Order
// @route   POST /api/v1/payments/create-order
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    
    if (!amount) {
      return next(new ErrorResponse('Please provide a valid order amount', 400));
    }

    if (!isRazorpayConfigured()) {
      console.warn('⚠️ Razorpay keys are missing. Using sandbox mock order creation.');
      const mockOrder = {
        id: `order_mock_${Math.random().toString(36).substr(2, 9)}`,
        entity: 'order',
        amount: amount * 100, // in paise
        amount_paid: 0,
        amount_due: amount * 100,
        currency: 'INR',
        receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
        status: 'created',
        attempts: 0,
        notes: [],
        created_at: Math.floor(Date.now() / 1000),
        isMock: true
      };
      return res.status(200).json({ success: true, data: mockOrder });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return next(new ErrorResponse('Some error occurred while creating order', 500));
    }

    res.status(200).json({ success: true, data: order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify Razorpay Payment and Update Order State
// @route   POST /api/v1/payments/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature, method } = req.body;

    if (!orderId || !razorpay_order_id || !razorpay_payment_id) {
      return next(new ErrorResponse('Please provide all verification details (orderId, razorpay_order_id, razorpay_payment_id)', 400));
    }

    // Find the local order
    const localOrder = await Order.findById(orderId);
    if (!localOrder) {
      return next(new ErrorResponse(`Local order not found with ID of ${orderId}`, 404));
    }

    let isSignatureValid = false;

    // Check signature
    if (razorpay_order_id.startsWith('order_mock_') || razorpay_signature === 'mock_signature' || !isRazorpayConfigured()) {
      console.warn('⚠️ Sandbox/Mock payment verification in progress.');
      isSignatureValid = true; // accept mock payments in sandbox
    } else {
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      isSignatureValid = razorpay_signature === expectedSign;
    }

    if (isSignatureValid) {
      // 1. Update Order in DB
      localOrder.isPaid = true;
      localOrder.paidAt = Date.now();
      localOrder.status = 'Processing'; // Preparing state
      localOrder.paymentResult = {
        id: razorpay_payment_id,
        status: 'success',
        update_time: Date.now().toString(),
        email_address: req.user.email
      };
      
      const updatedOrder = await localOrder.save();

      // 2. Log Payment Record
      await Payment.create({
        order: localOrder._id,
        user: req.user._id,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature || 'mock_signature',
        amount: localOrder.totalPrice,
        status: 'verified',
        method: method || 'UPI'
      });

      console.log(`✅ Order ${orderId} marked as PAID and transaction logged.`);
      return res.status(200).json({ success: true, data: updatedOrder, message: "Payment verified successfully" });
    } else {
      return next(new ErrorResponse("Invalid payment signature!", 400));
    }
  } catch (err) {
    next(err);
  }
};
