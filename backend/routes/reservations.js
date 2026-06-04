const express = require('express');
const {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation
} = require('../controllers/reservations');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getReservations)
  .post(createReservation);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateReservation)
  .delete(protect, authorize('admin'), deleteReservation);

module.exports = router;
