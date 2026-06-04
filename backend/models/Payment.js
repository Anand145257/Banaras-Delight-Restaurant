const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  signature: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    required: true,
    enum: ['captured', 'failed', 'verified'],
    default: 'verified'
  },
  method: {
    type: String,
    default: 'Razorpay'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
