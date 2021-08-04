const aws = require("aws-sdk");
const fs = require("fs");
aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION,
});
const s3 = new aws.S3();
const uploadToS3 = async (source) => {
    var params = {
        Bucket: process.env.S3_BUCKET,
        Body: source.path ? fs.readFileSync(source.path) : source.buffer,
        Key: source.fileName,
        ContentType: source.contentType,
        ACL: "private",
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error("Error occured while trying to upload to S3 bucket", err);
                reject(err);
            }
            if (data) {
                const path = "/" + params.Key;
                const signedUrl = s3.getSignedUrl("getObject", {
                    Bucket: process.env.S3_BUCKET,
                    Key: params.Key,
                    Expires: 60,
                });
                resolve({ path, url: signedUrl });
            }
        });
    });
};
module.exports = uploadToS3;
