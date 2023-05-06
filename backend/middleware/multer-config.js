const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.size > maxSize) {
    callback(new Error('La taille du fichier est trop grande'));
  } else {
    callback(null, true);
  }
};

module.exports = multer({storage: storage, fileFilter: fileFilter}).single('image');