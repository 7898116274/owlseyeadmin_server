const multer = require('multer');


// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './upload');
    },
    filename: (req, file, callback) => {
      const filename = `image-${Date.now()}.${file.originalname}`;
      callback(null, filename);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
      } else {
        callback(null, false);
        return callback(new Error('Only .png, .jpg, .jpeg files are allowed'));
      }
    },
  });


module.exports = upload