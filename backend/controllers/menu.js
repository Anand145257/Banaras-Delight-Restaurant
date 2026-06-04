const FoodItem = require('../models/FoodItem');
const ErrorResponse = require('../utils/errorResponse');

const fallbackData = require('../config/fallbackData');

// @desc    Get all menu items
// @route   GET /api/v1/menu
// @access  Public
exports.getMenuItems = async (req, res, next) => {
  try {
    const items = await FoodItem.find();
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    console.warn("DB connection failed, using fallback data.");
    // Fallback data has no _id, so we add a pseudo _id
    const fallbackWithId = fallbackData.map((item, index) => ({
      ...item,
      _id: index.toString()
    }));
    res.status(200).json({ success: true, count: fallbackWithId.length, data: fallbackWithId });
  }
};

// @desc    Get single menu item
// @route   GET /api/v1/menu/:id
// @access  Public
exports.getMenuItem = async (req, res, next) => {
  try {
    const item = await FoodItem.findById(req.params.id);

    if (!item) {
      return next(new ErrorResponse(`Food item not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// Helper to sanitize and format menu item data from multipart/form-data
const cleanMenuItemData = (body, file) => {
  const data = { ...body };
  
  if (file) {
    data.imageUrl = `/uploads/${file.filename}`;
  }

  // Convert boolean fields
  if (data.veg !== undefined) {
    data.veg = data.veg === 'true' || data.veg === true;
  }
  if (data.bestSeller !== undefined) {
    data.bestSeller = data.bestSeller === 'true' || data.bestSeller === true;
  }
  if (data.isAvailable !== undefined) {
    data.isAvailable = data.isAvailable === 'true' || data.isAvailable === true;
  }

  // Convert numbers
  if (data.price !== undefined) {
    data.price = Number(data.price);
  }
  if (data.rating !== undefined) {
    data.rating = Number(data.rating);
  }

  // Convert tags (comma-separated string or array)
  if (data.tags !== undefined) {
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim()).filter(t => t);
    } else if (Array.isArray(data.tags)) {
      data.tags = data.tags.map(t => typeof t === 'string' ? t.trim() : t).filter(t => t);
    }
  }

  return data;
};

// @desc    Create new menu item
// @route   POST /api/v1/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res, next) => {
  try {
    const data = cleanMenuItemData(req.body, req.file);
    const item = await FoodItem.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// @desc    Update menu item
// @route   PUT /api/v1/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res, next) => {
  try {
    const data = cleanMenuItemData(req.body, req.file);

    const item = await FoodItem.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return next(new ErrorResponse(`Food item not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const item = await FoodItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return next(new ErrorResponse(`Food item not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
