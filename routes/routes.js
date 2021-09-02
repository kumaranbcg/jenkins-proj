const express = require("express");
const router = express.Router();
router.get("/healthcheck", (err, res) => {
    return res.send("I am Healthcheck Service 1");
});
router.get("/myservice-1", (err, res) => {
    return res.send("I am Service 1");
});
router.get("/myservice-1/hello", (err, res) => {
    return res.send("Saying hello...");
});
module.exports = router;
