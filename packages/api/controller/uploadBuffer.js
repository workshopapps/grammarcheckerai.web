
const AWS = require('aws-sdk');
const { environment } = require('../config/environment')
const { ACCESSKEYID, S3SECRETEKEY, GRITTYBUCKETNAME } = environment;

// time measurement for the file upload process
let fileUploadStartTime;
let fileUPloadEndTime;


// Set the AWS Region.
const REGION = "eu-west-1";


  const s3 = new AWS.S3({
    region: REGION,
    credentials: {
      accessKeyId: ACCESSKEYID,
      secretAccessKey: S3SECRETEKEY
    }
});



const uploadFile1 = async (dataBuffer) => {
    try {

    // Setting up S3 upload parameters
    startTime = new Date();
    fileUploadStartTime = new Date();
    console.log("-------------------- File Upload to S3-Bucket --------------------");

    const params = {
        Bucket: GRITTYBUCKETNAME,
        Key: "UserAudioFile", // File name you want to save as in S3
        contenType: "mp3, hss,",
        Body: Buffer.from(dataBuffer, "base64"),
    };

    // Uploading files to the bucket
    await  s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        else {
                fileUPloadEndTime = new Date;
                console.log("File upload processing time - success: ", (fileUploadStartTime - fileUPloadEndTime)/1000);
                console.log(`File uploaded successfully. ${data.Location}`);
                return data.location;
            }
        })
    }

     catch (err) {
        fileUPloadEndTime = new Date;
        console.log("File upload processing time - failed: ", (fileUploadStartTime - fileUPloadEndTime)/1000);
        console.error(`Error: ${err.message}`);
    };
};


module.exports = uploadFile1
