const multer = require('multer');
const path = require('path');

// Destination folder for uploads
const uploadPath = path.join(__dirname, '..', 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to accept only images
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const mime = allowed.test(file.mimetype);
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  if (mime && ext) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
