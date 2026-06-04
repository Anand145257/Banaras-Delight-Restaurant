// backend/routes/adminMenu.js
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
const upload = require('../middleware/upload');

router
  .route('/')
  .get(getMenuItems) // public can view
  .post(protect, authorize('admin'), upload.single('image'), createMenuItem);

router
  .route('/:id')
  .get(getMenuItem)
  .put(protect, authorize('admin'), upload.single('image'), updateMenuItem)
  .delete(protect, authorize('admin'), deleteMenuItem);

module.exports = router;
