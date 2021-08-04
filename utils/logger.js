require("winston-daily-rotate-file");
var winston = require("winston");
var requestId = guid();
//Generate a random request ID for identification
function guid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

class CustomLogger {
    constructor() {
        this.logger = null;
        winston.loggers.add("logger", {
            transports: [
                /*new (winston.transports.Console)({
            level: 'info',
            colorize: true
        }),*/

                //new files will be generated each day, the date patter indicates the frequency of creating a file.
                new winston.transports.DailyRotateFile({
                    name: "debug-log",
                    filename: "logs/API-Logger-%DATE%.log",
                    prepend: true,
                    datePattern: "YYYY-MM-DD",
                    format: winston.format.printf(
                        (info) =>
                            `${this.getFormattedDate()} | ${requestId} | [${info.level}] | ${
                                info.message
                            }`
                    ),
                }),
            ],
        });
        this.logger = winston.loggers.get("logger");
    }

    //Get a formatted date
    getFormattedDate() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        minutes = minutes < 10 ? "0" + minutes : minutes;
        let strTime = hours + ":" + minutes;
        return day + "/" + month + "/" + year + " " + strTime;
    }

    //Write an error log
    error(message) {
        this.logger.error(message);
        return true;
    }

    //Write an info log
    info(message) {
        this.logger.info(message);
        return true;
    }

    //Function used as an express middleware to capture incoming IP address and request ID
    requestDetails(loggerInstance) {
        return function (req, res, next) {
            //this.clientIPAddress = get_ip(req).clientIp
            requestId = guid();
            req.appLogger = loggerInstance;
            next();
        };
    }
}

module.exports = new CustomLogger();
