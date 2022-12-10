const multer = require("multer");

const { environment } = require("../config/environment");
const { FILE_SIZE } = environment;

// Multer middleware for file upload
function uploadFile(req, res, next) {
  // set storage engine to use internal memory
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: parseInt(FILE_SIZE),
    },
  }).single("file");

  // Handle multer specific errors
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({
        success: false,
        message: `${err.message}`,
      });
    } else if (err) {
      return res.status(500).send({
        success: false,
        message: `${err.message}`,
      });
    }
    next();
  });
}

module.exports = uploadFile;
