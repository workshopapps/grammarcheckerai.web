const { environment } = require("../config/environment");
const { ACCESSKEYID, S3SECRETEKEY, GRITTYBUCKETNAME } = environment;
const fs = require("fs");
const AWS = require("aws-sdk");

// The name of the bucket that you have created
const BUCKET_NAME = GRITTYBUCKETNAME;

AWS.config.update({
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
  region: "us-east-1",
  accessKeyId: ACCESSKEYID,
  secretAccessKey: S3SECRETEKEY,
});

const s3 = new AWS.S3({
  accessKeyId: ACCESSKEYID,
  secreteKey: S3SECRETEKEY,
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: "us-east-1",
  },
};

const create = (req, res) => {
  let bucket = s3.createBucket(params, function (err, data) {
    if (err) console.log(err, err.meaasge);
    else console.log("Bucket Created Successfully", data.Location);
  });
  return res.status(200).json({ link: bucket });
};

module.exports = create;
