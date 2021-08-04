const errorCodes = require("../config/errorCodes");
const errorMessages = require("../config/errorMsgs");
const cryptr = require("./cryptojs");
const canDecrypt = process.env.API_ENCRYPT == "true";
module.exports = {
    decryptData: async (req, res, next) => {
        if (!canDecrypt) return next();
        if (req.method == "GET") return next();
        if (req.body && req.body.data) {
            const decryptedData = cryptr.decrypt(req.body.data);
            if (decryptedData && decryptedData.length > 0) {
                req.body = JSON.parse(decryptedData);
                return next();
            } else {
                return res
                    .status(errorCodes.HTTP_UNPROCESSABLE_ENTITY)
                    .json({ messge: errorMessages[errorCodes.HTTP_UNPROCESSABLE_ENTITY] });
            }
        }
        next();
    },
    encryptData: async (data) => {
        if (!canDecrypt) return data;
        return data ? { data: cryptr.encrypt(JSON.stringify(data)) } : null;
    },
};
