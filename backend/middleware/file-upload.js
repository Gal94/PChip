const multer = require('multer');
const { v1: uuidv1 } = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
};

//Goal: What files to accept and where to store

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    const extention = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuidv1() + '.' + extention);
  },
});

//filters files to only accept files from the MIME_TYPE_MAP
const filter = (req, file, cb) => {
  //double !! converts null/undefined to false and rest to true
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  let error = isValid ? null : new Error('Invalid mime type!');
  cb(error, isValid);
};

//Object of preconfigured middlewaress
const fileUpload = multer({
  limits: 3000000,
  storage: storage,
  fileFilter: filter,
});

module.exports = fileUpload;
