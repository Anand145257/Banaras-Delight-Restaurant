const express = require('express');
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menu');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getMenuItems)
  .post(protect, authorize('admin'), createMenuItem);

router
  .route('/:id')
  .get(getMenuItem)
  .put(protect, authorize('admin'), updateMenuItem)
  .delete(protect, authorize('admin'), deleteMenuItem);

module.exports = router;
