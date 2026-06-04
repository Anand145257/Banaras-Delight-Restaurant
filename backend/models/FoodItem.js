const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a food name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [50, 'Price must be at least ₹50']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  imageUrl: {
    type: String,
    default: 'no-photo.jpg'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    default: 4.5
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  veg: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
