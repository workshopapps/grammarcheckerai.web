const AWS = require('aws-sdk');
const { environment } = require('../config/environment')
const { ACCESSKEYID, S3SECRETEKEY, GRITTYBUCKETNAME } = environment;

// Set the AWS Region.
const REGION = "eu-west-1";

const s3 = new AWS.S3({
    region: REGION,
    credentials: {
        accessKeyId: ACCESSKEYID,
        secretAccessKey: S3SECRETEKEY
    }
});

const fileUploadToS3Bucket = async (dataBuffer) => {
    try {
        // Setting up S3 upload parameters
        const params = {
            Bucket: GRITTYBUCKETNAME,
            Key: "UserAudioFilenbnbnb", // File name you want to save as in S3 // Change the key value to UUID or GUID
            Body: dataBuffer,
        };
        
        // Uploading files to the bucket
        let promise = new Promise((resolve, reject) => {
            s3.upload(params, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.Location);
                }
            })
        })

        let fileLocation = await promise;
        return fileLocation;
    }

    catch (err) {
        console.error(`Error: ${err.message}`);
    };
};


module.exports = fileUploadToS3Bucket