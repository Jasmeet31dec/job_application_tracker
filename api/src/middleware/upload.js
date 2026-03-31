const cloudinary = require('../configuration/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Configure Cloudinary using your Environment Variables


// 2. Setup Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes', // Folder name in Cloudinary
    resource_type: 'auto', 
    allowed_formats: ['pdf'], 
    public_id: (req, file) => `resume-${Date.now()}` 
  },
});

// 3. Create Multer Instance with PDF Filter
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

module.exports = upload;