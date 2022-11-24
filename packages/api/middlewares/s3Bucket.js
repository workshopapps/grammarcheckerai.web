const { S3Client } = require('@aws-sdk/client-s3') 
const multer = require('multer')
const multerS3 = require('multer-s3')
const { environment } = require('../config/environment')
const { ACCESSKEYID, S3SECRETEKEY, GRITTYBUCKETNAME } = environment;


// Set the AWS Region.
const REGION = "us-east-1";

const credentials = {
    region: REGION,
    credentials: {
      accessKeyId: ACCESSKEYID,
      secretAccessKey: S3SECRETEKEY
    }
  };

// Create an Amazon S3 service client object.
const s3 = new S3Client( credentials );

const uploadAudio = multer({
  storage: multerS3({
    s3: s3,
    bucket: GRITTYBUCKETNAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
module.exports = uploadAudio