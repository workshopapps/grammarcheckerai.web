const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const { environment } = require('../config/environment');
const { ACCESSKEYID, S3SECRETEKEY, GRITTYBUCKETNAME } = environment;

const s3 = new aws.S3({
  accessKeyId: ACCESSKEYID,
  secretAccessKey: S3SECRETEKEY,
  Bucket: GRITTYBUCKETNAME,
});

// setting the file type
const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: GRITTYBUCKETNAME,
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
}).single('imageFile');

const profileImgUpload = (req, res, next) => {
  // Handle multer specific errors
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError)
      return res.status(400).send({
        success: false,
        message: `${error.message}`,
      });
    if (error)
      return res.status(500).send({
        success: false,
        message: `${error.message}`,
      });

    next();
  });
};

module.exports = profileImgUpload;
