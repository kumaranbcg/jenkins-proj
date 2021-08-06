const express = require("express");
const router = express.Router();
const env = process.env.NODE_ENV || "development";
const moment = require("moment");
const dateTime = moment().add(5, "hours").add(30, "minutes").format("DD-MMM-YYYY hh:mm:ss a");
router.use((req, res, next) => {
    if (req.url == "/") {
        res.send(`
            <table>
                <tbody>
                    <tr>
                        <td><b>Server Status</b></td>
                        <td>: I am working fine1</td>
                    </tr>
                    <tr>
                        <td><b>Last Code Updated At</b></td>
                        <td>: ${dateTime}</td>
                    </tr>
                    <tr>
                        <td><b>ENV</b></td>
                        <td>: ${env}</td>
                    </tr>
                </tbody>
            </table>
        `);
    }
});
module.exports = router;
