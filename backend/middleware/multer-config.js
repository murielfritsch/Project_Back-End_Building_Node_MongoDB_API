const multer = require('multer');

const MIME_TYPES = {
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
    'image/png' : 'png'
};

// configure multer & export a configured version of multer
// how multer figures out how to save the file
const storage = multer.diskStorage({
    // object containing all of the options
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
   } 
);

module.exports = multer({storage: storage}).single('image');

