const responseStatus = require("../config/errorCodes");
const messageTypes = require("../config/errorMsgs");
const { encryptData } = require("./encryptDecrypt");
// response class
class Response {
    // triggering a success response
    async success(req, res, status, data = null, message = "success") {
        let ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        if (status == responseStatus.HTTP_OK) {
            req.appLogger.info(
                `Method: ${req.method} | Status: ${status} | IP : ${ip} | URL : ${
                    req.protocol
                }://${req.get("host")}${req.originalUrl} | Request Body : ${JSON.stringify(
                    req.body ? req.body : {}
                )} | Response :  ${JSON.stringify(data)}`
            );
            const encryptedResponse = await encryptData({ message, data });
            return res.status(status).json(encryptedResponse);
        } else if (status == responseStatus.HTTP_INTERNAL_SERVER_ERROR) {
            req.appLogger.error(
                `Method: ${req.method} | Status: ${status} | IP : ${ip} | URL : ${
                    req.protocol
                }://${req.get("host")}${req.originalUrl} | Request Body : ${JSON.stringify(
                    req.body ? req.body : {}
                )} | Error : ${message}`
            );
            const encryptedResponse = await encryptData(
                JSON.stringify({ message: messageTypes.technicalError })
            );
            return res.status(status).json(encryptedResponse);
        } else {
            req.appLogger.error(
                `Method: ${req.method} | Status: ${status} | IP : ${ip} | URL : ${
                    req.protocol
                }://${req.get("host")}${req.originalUrl} | Request Body : ${JSON.stringify(
                    req.body ? req.body : {}
                )} | Error : ${message}`
            );
            const encryptedResponse = await encryptData({ message, data });
            return res.status(status).json(encryptedResponse);
        }
    }
    // triggering a error response
    async error(req, res, status, message) {
        let ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        req.appLogger.error(
            `Method: ${req.method} | Status: ${status} | IP : ${ip} | URL : ${
                req.protocol
            }://${req.get("host")}${req.originalUrl} | Request Body : ${JSON.stringify(
                req.body ? req.body : {}
            )} | Error : ${message}`
        );
        const encryptedResponse = await encryptData({ message: messageTypes.technicalError });
        return res.status(status).json(encryptedResponse);
    }
    // triggering a invalid response
    async invalid(req, res, status, message) {
        let ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        req.appLogger.error(
            `Method: ${req.method} | Status: ${status} | IP : ${ip} | URL : ${
                req.protocol
            }://${req.get("host")}${req.originalUrl} | Request Body : ${JSON.stringify(
                req.body ? req.body : {}
            )} | Error : ${message}`
        );
        const encryptedResponse = await encryptData({ message });
        return res.status(status).json(encryptedResponse);
    }
    // triggering a joi error response
    async joierrors(req, res, err) {
        let ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        let error = err.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message.replace(/"/g, "");
            return prev;
        }, {});
        let message =
            Object.values(error).join(", ") +
            ", " +
            messageTypes[responseStatus.HTTP_UNPROCESSABLE_ENTITY];
        let status = responseStatus.HTTP_UNPROCESSABLE_ENTITY;
        req.appLogger.error(
            `Method: ${req.method} | Status: ${status} | IP : ${ip} | URL : ${
                req.protocol
            }://${req.get("host")}${req.originalUrl} | Request Body : ${JSON.stringify(
                req.body ? req.body : {}
            )} | BadRequestError : ${JSON.stringify(error)}`
        );
        const encryptedResponse = await encryptData({ message });
        return res.status(status).json(encryptedResponse);
    }
}

// exporting the module
module.exports = new Response();
