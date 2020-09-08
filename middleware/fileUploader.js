const multer = require('multer');
const fs = require('fs');

const pathToImages = './files';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.access(pathToImages, function(err) {
            if (err && err.code === 'ENOENT') {
                fs.mkdir(pathToImages, function() {
                    cb(null, './files');
                });
            } else {
                cb(null, './files');
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, (Math.random().toString(36).substring(3)) + (Math.random().toString(18).substring(3)) + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};


module.exports = multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).fields([{ name: 'icon', maxCount: 1 }]);