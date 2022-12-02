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

const profileImgUpload = multer({
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

module.exports = profileImgUpload;
