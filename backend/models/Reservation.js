const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  date: {
    type: Date,
    required: [true, 'Please add a reservation date']
  },
  time: {
    type: String,
    required: [true, 'Please add a reservation time']
  },
  guests: {
    type: Number,
    required: [true, 'Please add number of guests'],
    min: [1, 'Minimum 1 guest required']
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests can not exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
