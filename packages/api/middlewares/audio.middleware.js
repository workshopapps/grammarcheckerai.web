const multer = require('multer');
const path = require('path');

const { environment } = require('../config/environment')
const { FILE_SIZE } = environment;

// Multer middleware for file upload
function uploadFile(req, res, next) {
    // set storage engine to use internal memory
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            let fileExt = path.extname(file.originalname);
            if (fileExt === '.mp3' || fileExt === '.m4a' || fileExt === '.aac') {
                return callback(null, true);
            }

            return res.status(400).send({
                success: false,
                message: "Only .mp3, .m4a and .aac audio files are allowed"
            })
        },
        limits: {
            fileSize: parseInt(FILE_SIZE)
        }
    }).single("file");

    // Handle multer specific errors
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send({
                success: false,
                message: `${err.message}`
            })
        } else if (err) {
            return res.status(500).send({
                success: false,
                message: `${err.message}`
            })
        }
        next();
    })
}

module.exports = uploadFile