const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const response = require("./response");
const errorCodes = require("../config/errorCodes");
aws.config.update({
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: process.env.S3_REGION,
});
const s3 = new aws.S3();
const docUpload = async (req, res, next) => {
    const storage = multerS3({
        s3: s3,
        acl: "private",
        bucket: process.env.S3_BUCKET,
        contentType: (req, file, cb) => {
            cb(null, file.mimetype);
        },
        key: function (req, file, cb) {
            const filename =
                file.fieldname +
                "-" +
                Date.now() +
                path.extname(file.originalname).toLocaleLowerCase();
            cb(null, filename);
        },
    });
    const filter = (req, res, file, cb) => {
        if (
            path.extname(file.originalname).toLowerCase() === ".pdf" ||
            path.extname(file.originalname).toLowerCase() === ".docx" ||
            path.extname(file.originalname).toLowerCase() === ".xlsx" ||
            path.extname(file.originalname).toLowerCase() === ".xls" ||
            path.extname(file.originalname).toLowerCase() === ".jpg" ||
            path.extname(file.originalname).toLowerCase() === ".jpeg" ||
            path.extname(file.originalname).toLowerCase() === ".png"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            if (!req.files.errors) {
                req.files.errors = [];
            }
            req.files.errors.push({
                file,
                reason: "Invalid file type.",
            });
        }
    };
    req.files = {};
    multer({
        storage,
        fileFilter: (req, file, cb) => filter(req, res, file, cb),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).any()(req, res, (err) => {
        if (err && err.message) response.error(req, res, errorCodes.HTTP_BAD_REQUEST, err.message);
        else next();
    });
};
module.exports = docUpload;
