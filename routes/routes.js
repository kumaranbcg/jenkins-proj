const express = require("express");
const router = express.Router();
const v1Routes = require("./v1");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const moment = require("moment");
const dateTime =  moment().add(5, "hours").add(30, "minutes").format("DD-MMM-YYYY hh:mm:ss a");
router.use((req, res, next) => {
    if (/healthCheck/gi.test(req.url)) {
        res.send(`
            <table>
                <tbody>
                    <tr>
                        <td><b>Server Status</b></td>
                        <td>: I am working fine</td>
                    </tr>
                    <tr>
                        <td><b>Last Code Updated At</b></td>
                        <td>: ${dateTime}</td>
                    </tr>
                    <tr>
                        <td><b>ENV</b></td>
                        <td>: ${env}</td>
                    </tr>
                    <tr>
                        <td><b>DB Host</b></td>
                        <td>: ${config.host}</td>
                    </tr>
                </tbody>
            </table>
        `);
    } else if (req.headers.authorization) {
        let token = req.headers.authorization.replace("Bearer ", "");
        if (token == process.env.API_AUTH_KEY) {
            next();
        } else {
            next(new Error());
        }
    }
});
router.use("/vca/v1/api", v1Routes);
module.exports = router;
